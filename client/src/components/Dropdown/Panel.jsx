import React from "react";

import "./Dropdown.scss";

const Panel = props => {
  const { width, collapseSectionId, productFilter, panelSetKey = {key: '', sectionName: '', nestedSection: ''}, items= [], className, maxWidth, minWidth,  style, ...attributes } = props

  const [state, setState] = React.useState({
    collapseSectionId: [],
    selectValueForFilter: [],
  })

  React.useEffect(()=>{
    if(collapseSectionId){
      setState({ ...state, collapseSectionId: collapseSectionId })
    }
  }, [collapseSectionId])
  


  let styles = {...style}
  if(maxWidth){
    styles.maxWidth = maxWidth
  }
  if(minWidth){
    styles.minWidth = minWidth
  }
  if(width){
    styles.width = width
  }

  
  function handleCollapse(_id){
    const { collapseSectionId } = state

    let index = collapseSectionId.indexOf(_id)

    // not frist time click // 
    if(index === -1){
      setState({...state, collapseSectionId: [...collapseSectionId, _id]})
    } 

    else {
      let collapsedList = []
      for(let i=0; i<collapseSectionId.length; i++){
        if(collapseSectionId[i] !== _id){
          collapsedList.push(collapseSectionId[i])
        }
      }
      setState({ ...state, collapseSectionId : collapsedList })
    }    
  }


  function checkFilter_Field(item, sectionName){
    const { selectValueForFilter  } = state
    let result = false
    
    selectValueForFilter.map(i=>{
      if( i.fieldName.toLowerCase() === sectionName.toLowerCase() ){
        if(item.value === i.value){
          result= true
        }
      }
    })
    return result
  }
  

  function selectFilterItem(item, sectionName, sectionId){

    let updateFilterSelectValue = [...state.selectValueForFilter]
    
    // already select is or not for filter............... 
    let i = updateFilterSelectValue.findIndex(section=> section.name === item.name )
    if(i === -1){
      updateFilterSelectValue.push({...item, [panelSetKey.sectionName]: sectionName.toLowerCase(), _id: sectionId})      
    } else{
      updateFilterSelectValue.splice(i, 1)
    }

    setState({...state, selectValueForFilter: updateFilterSelectValue })

    // when added filter item............. action filter and update state
    if(productFilter)
      productFilter(updateFilterSelectValue)
  }


  //> undo filter product..................
  function removeSelectValueForFilter(select){
    const { selectValueForFilter } = state
    let updateSelectValueForFilter = [...selectValueForFilter]
    let findSelectIndex = updateSelectValueForFilter.findIndex( selectValue => selectValue[panelSetKey.sectionName] === select[panelSetKey.sectionName]  )
    updateSelectValueForFilter.splice(findSelectIndex, 1);

    setState({ ...state, selectValueForFilter: updateSelectValueForFilter })   
    
    // when remove from filter item............. action filter and update state
    if(productFilter)
      productFilter(updateSelectValueForFilter) 
  }


   return (
    <div data-test="dropdown_panel" {...attributes} style={styles} className={["dropdown_panel", className].join(" ")}>

      {/* {props.children} */}

      {/*............ show selected filter fields............  */}
      <ul className="select_filter_values">
        { state.selectValueForFilter.map((select, i)=>(
          <li key={i} className="select_filter_item">
            <span className="filter_value">{select[panelSetKey.sectionName]} : {select.name}</span>
            <span onClick={(e)=>removeSelectValueForFilter(select)} className="remove_filter" >
              <i className="far fa-times-circle"></i>
            </span>
          </li>
        )) }
      </ul>


      <ul className="dropdown_panel_section_list">
        { items.map((sectionItem, i)=><Item 
          key={panelSetKey.key} 
          panelSetKey={panelSetKey} 
          sectionItem={sectionItem}
          collapseSectionId={state.collapseSectionId}  
          handleCollapse={handleCollapse}  
          checkFilter_Field={checkFilter_Field}
          onSelectFilterItem={selectFilterItem}
          />
        ) }
      </ul>
    </div>
  );
};



export default Panel;

const Item = (props) => {
  const { 
    sectionItem, 
    panelSetKey, 
    collapseSectionId, 
    handleCollapse, 
    checkFilter_Field,
    onSelectFilterItem
    } = props 
  

  
  return(
    <li className="panel_section_item">

      {/* .......main section....... */}
      <div onClick={(e)=>handleCollapse && handleCollapse(sectionItem[panelSetKey.key])} className="panel_section_item_name">
        <span>{sectionItem[panelSetKey.sectionName]}</span>
        <span> 
          <i 
            className={['menu_collapse_icon fa',
              collapseSectionId.indexOf(sectionItem[panelSetKey.key]) != -1 ? 'fa-chevron-down' : 'fa-chevron-right'
            ].join(' ')} 
            aria-hidden="true">
          </i> 
        </span>
      </div>
      
      {/* ........ nested section........ */}
      { collapseSectionId.indexOf(sectionItem[panelSetKey.key]) != -1 && (
        <ul className="dropdown_neated_list">
          { sectionItem[panelSetKey.nestedSection] && sectionItem[panelSetKey.nestedSection].map((nestedSection, i)=>{
            let active = checkFilter_Field(nestedSection, sectionItem[panelSetKey.sectionName])
              
            return (
              <li 
                key={i} 
                className={["dropdown_neated_item", active ? 'active' : ''].join(' ')} 
                onClick={(e)=>onSelectFilterItem(nestedSection, sectionItem[panelSetKey.sectionName], sectionItem[panelSetKey.key])}
                >
                  <span className="dropdown_neated_item_name">{nestedSection.name}</span>
                  { active && <span className="dropdown_neated_item_subtrack-button">
                    <div className="minas_button"/>
                    </span>
                  }
              </li>
            )
          }) }
        </ul>
        )} 
    </li>
  )
}


{/* 
  <Dropdown className="">
    <div className="dropdown_nav">
      <Button>Click</Button>
    </div>

    <div className="dropdown_panel ">
      { [1,2,3,4].map(sectionItem=>(
        <li key={sectionItem} >{sectionItem}</li>
      )) }
    </div>
</Dropdown> 
*/}