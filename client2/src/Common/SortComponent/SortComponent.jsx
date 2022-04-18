import React from 'react';
import "./SortComponent.scss"
import Dropdown from "src/components/UI/Dropdown";



const SortComponent = (props) => {
  
  const { isShowSortPanel, onChangeSort } = props
  
  const [sortBy, setSort]= React.useState({tauched: false, order: "asc", sorted: "",  fields: ["price", "brand", "name", "releases"] })
  
  function selectSorthandle(value){
    setSort({...sortBy, sorted: value, tauched: true})
    if (sortBy.sorted === value){
      let order = sortBy.order == "asc" ? "desc" : "asc"
      setSort({...sortBy, order: order})
    }
  }
  
  React.useEffect(()=>{
    onChangeSort && onChangeSort({order: sortBy.order, field: sortBy.sorted },  sortBy.tauched )
  }, [sortBy, setSort])
  
  
  return (
      <div>
        <Dropdown isShow={isShowSortPanel} maxWidth={330}>
        <div className="sort_panel">
          { sortBy && sortBy.fields.map((item, i)=>{
           return (
               <div className="sort_item" key={i} onClick={()=>selectSorthandle(item)} >
                 <span className="sort_item-name">{item}</span>
                 { item === "price" ? (
                    <span> { sortBy.sorted === item ? <i className={["fal", sortBy.order === "asc" ? "fa-sort-numeric-down" : "fa-sort-numeric-up"].join(" ")}></i> : ""} </span>
                 ) : (
                   <span> { sortBy.sorted === item ? <i className={["fal", sortBy.order === "asc" ? "fa-sort-alpha-down" : "fa-sort-alpha-up"].join(" ")}></i> : ""} </span>
                 )}
               </div>
           )}) }
        </div>

        </Dropdown>
      </div>
  );
};

export default SortComponent;

