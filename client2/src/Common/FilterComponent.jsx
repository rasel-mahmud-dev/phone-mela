import React from 'react'
import "./FilterComponent.scss"
import api from "../apis/api";
import Dropdown from "UI/Dropdown";
import SortComponent from "./SortComponent/SortComponent";
import SearchProduct from "src/Common/SearchProduct/SearchProduct";

import Backdrop from "UI/Backdrop/Backdrop"


const FilterComponent = (props) => {
  
  const [sortBy, setSort] = React.useState({
    select: {value: "", name: ""},
    options: [
      // {name: "Name", value: "name" },
      // {name: "Price", value: "price" },
      // {name: "Brand", value: "brand" },
      // {name: "Releases", value: "releases" }
    ]
  })
  
  const [filterAbleList, setFilterAbleList] = React.useState([
      // {
      // _id: 1,
      // fieldName: "Brand",
      // options: [
      //   {name: "Apple", value: "apple"},
      //   {name: "Samsung", value: "samsung"},
      //   {name: "Symphony", value: "symphony"},
      //   {name: "Xiaomi", value: "xiaomi"},
      // ] },
    {
      _id: 2,
      fieldName: "Display",
      options: [
        {name: "Super", value: "super"},
        {name: "IPS", value: "ips"},
        {name: "Retina", value: "retina"},
      ] }
    ])
  

  
  const [selectValueForFilter, setSelectValueForFilter] = React.useState([])
  // [ {name: "Symphony", value: "symphony", fieldName: "brand", _id: 1},
  //   {name: "Apple", value: "apple", fieldName: "brand", _id: 1}]
  
  const [dropdownCollapseId, setDropdownCollapseId] = React.useState([])
  
  
  const [isFilterPanelShow, setFilterPanelShow] = React.useState(false)
  const [isShowSortPanel, setShowSortPanel] = React.useState(false)
  
  
  const [tauched, setTauched] = React.useState(false)
  
  React.useEffect(() => {
    api.get("/api/fetch-category/mobile").then(category => {
      let f = []
      category.fields && category.fields.sort().map((item) => {
        f.push({value: item, name: item[0].toUpperCase() + item.slice(1)})
      })
      setSort({...sortBy, options: f})
    })
    
    api.get("/api/fetch-brand").then(brands => {
      let i = {
        _id: Date.now(),
        fieldName: "brand",
        options : []
      }
      brands && brands.forEach(item=>{
        i.options.push({name: item.name[0].toUpperCase() + item.name.slice(1), value: item._id})
      })
      setFilterAbleList([...filterAbleList, i])
    })
    
  }, [0])
  
  React.useEffect(() => {
   props.changeFilter(selectValueForFilter, tauched)
  }, [selectValueForFilter, setSelectValueForFilter, tauched])
  
  
  function handleToggleFilterPanel(e) {
    setFilterPanelShow(!isFilterPanelShow)
  }
  
  function handleToggleSortPanel(e) {
    setShowSortPanel(!isShowSortPanel)
  }
  
  function collapseFilter(panelId) {
    let i = dropdownCollapseId.indexOf(panelId)
    if (i === -1){
      setDropdownCollapseId([...dropdownCollapseId, panelId])
    } else{
      let g = [...dropdownCollapseId].splice(i + 1, 1)
      setDropdownCollapseId(g)
    }
  }
  
  function removeSelectValueForFilter(item) {
    let u = [...selectValueForFilter]
    let itemIndex = u.filter(i=>i.value !== item.value )
    setSelectValueForFilter(itemIndex)
    setTauched(true)
  }
  
  //> filter product..............
  function selectFilterItem(item, fieldName, _id) {
    let updateFilterSelectValue = [...selectValueForFilter]
    
    let i = updateFilterSelectValue.findIndex(o => o.name === item.name)
    if (i === -1) {
      updateFilterSelectValue.push({...item, fieldName: fieldName.toLowerCase(), _id})
    } else {
      updateFilterSelectValue.splice(i, 1)
    }
    
    setSelectValueForFilter(updateFilterSelectValue)
    
    setTauched(true)
    
    // when added filter item............. action filter and update state
    // this.productFilter(updateFilterSelectValue)
  }
  
  
  // filter list checked function...................
  function listCheked(item, fieldName, _id) {
    let result = false
    
    selectValueForFilter.map(i => {
      if (i.fieldName.toLowerCase() === fieldName.toLowerCase()) {
        if (item.value === i.value) {
          result = true
        }
      }
    })
    return result
  }
  
  function handleCloseBackdrop(e){
    props.toggleBackdrop(false)
    setFilterPanelShow(false)
    setShowSortPanel(false)
  }
  
  // .................... jsx Rendering.........................
  function filterSection() {
    return (
        <div className="ffffffff">
          <Dropdown isShow={isFilterPanelShow} maxWidth={330} className="filter_dropdown">
            {isFilterPanelShow && (
                <div className="dropdown_panel filter_panel">
                  <ul className="select_filter_values">
                    {selectValueForFilter.map((select, i) => (
                        <li key={i} className="select_filter_item">
                          <span className="filter_value">{select.fieldName} : {select.name}</span>
                          <span onClick={(e) => removeSelectValueForFilter(select)} className="remove_filter">
                              <i className="far fa-times-circle"/> </span>
                        </li>
                    ))}
                  </ul>
                  {filterAbleList.map((menu) => {
                        return (
                            <div key={menu._id}>
                              <ul className="section_name">
                                <div onClick={(e) => collapseFilter(menu._id)} className="name">
                                  <span>{menu.fieldName}</span>
                                  <span> <i className={['menu_collapse_icon fal',
                                    dropdownCollapseId.indexOf(menu._id) != -1
                                        ? 'fa-chevron-down' : 'fa-chevron-right'].join(' ')} aria-hidden="true"></i></span>
                                </div>
                                
                                {dropdownCollapseId.indexOf(menu._id) != -1 && (
                                    <ul className="nested_one_dropdown_menu">
                                      {menu.options && menu.options.map(g => {
                                        let active = listCheked(g, menu.fieldName, menu._id)
                                        return (
                                            <li
                                                key={g.value}
                                                className={['nested_one_dropdown_menu--item', active ? 'active' : ''].join(' ')}
                                                onClick={(e) => selectFilterItem(g, menu.fieldName, menu._id)}>
                                              <span className="drop_down_menu_item_name">{g.name}</span>
                                              {active && <span className="drop_down_menu_item_subtrack-button">
                                    <div className="minas_button"/>
                                    </span>
                                              }
                                            </li>
                                        )
                                      },)}
                                    </ul>
                                )}
                              </ul>
                            </div>
                        )
                      }
                  )}
                </div>
            )}
          </Dropdown>
          
          {/*filter select list beside filter icon */}
          {/*{selectValueForFilter && selectValueForFilter.length > 0 &&*/}
          {/*<div className="filter_select_list">*/}
          {/*  <ul className="select_filter_values">*/}
          {/*    {selectValueForFilter.map((select, i) => (*/}
          {/*        <li key={i} className="select_filter_item">*/}
          {/*          <span className="filter_value">{select.fieldName} : {select.name}</span>*/}
          {/*          <span onClick={(e) => removeSelectValueForFilter(select)} className="remove_filter">*/}
          {/*          <i className="far fa-times-circle"></i>*/}
          {/*        </span>*/}
          {/*        </li>*/}
          {/*    ))}*/}
          {/*  </ul>*/}
          {/*</div>*/}
          {/*}*/}
        
        </div>
    )
    
  }
  
  return (
    <div className="product-page-filter">
      <Backdrop onCloseBackdrop={handleCloseBackdrop} transparent isOpenBackdrop={isFilterPanelShow || isShowSortPanel} />
      <div className="item">
        <label htmlFor="">show per page</label>
        <ShowPerPageView onChangePerPage={props.onChangePerPage} perPageShow={props.perPageShow} totalItem={props.totalItem} />
      </div>
      <div className="item sort_panel_wrapper ">
        <i onClick={handleToggleSortPanel} className="fal fa-sort-alt"/>
       <SortComponent onChangeSort={props.onChangeSort} isShowSortPanel={isShowSortPanel}  />
      </div>
      
      <div className="item">
          <i onClick={handleToggleFilterPanel} className="fas fa-filter filter-menu-icon"/>
          {filterSection()}
      </div>
      
      <div className="item flex-1">
        <SearchProduct handleSearch={props.handleSearch}  />
      </div>
    </div>
  )
}


const ShowPerPageView=(props)=>{
  const { totalItem, onChangePerPage } = props
  const [currentPageView, setCurrentPageView]  = React.useState()
  
  React.useEffect(()=>{
    setCurrentPageView(props.perPageShow )
  }, [props.perPageShow, 0])
  
  const perPage = []
  if(totalItem && totalItem > 0){
    for (let i = 1; i<=totalItem; i++){
      if(totalItem > (i * 5)){
        perPage.push( i * 5  )
      } else if(totalItem === i){
        perPage.push(totalItem)
      }
    }
  }
  
  const handleChangeSelect=(e)=>{
    onChangePerPage && onChangePerPage(e.target.value)
    setCurrentPageView(e.target.value)
  }
  
  return (
    <div>
      <select onChange={handleChangeSelect} value={ String(currentPageView) } >
        { perPage.map(item=>(
            <option value={item}>{item}</option>
        )) }
      </select>
    </div>
  )
}


export default FilterComponent
