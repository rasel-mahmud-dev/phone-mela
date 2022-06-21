import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter, faSearch} from "@fortawesome/pro-regular-svg-icons";
import "./styles.scss"
import {onFilterSearchChange, onSearchChange} from "actions/productAction";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "store/index";
import Preload from "UI/Preload/Preload";
import {faTimesCircle} from "@fortawesome/pro-solid-svg-icons";

const Search = (props) => {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {search} = useSelector((state: RootStateType)=> state.productState)
  
  function onChangeSearch(e){
    if(e.target.value === ""){
      dispatch(onFilterSearchChange(""))
      dispatch(onSearchChange(""))
      navigate("/q")
    } else {
      dispatch(onSearchChange(e.target.value))
    }
  }
  
  function handleSearch(e){
    e.preventDefault()

    // let val = searchInput.current?.value
    dispatch(onFilterSearchChange(search.value))
    if(search.value !== "") {
      return  Preload.Load("/q", () => {
        navigate("/q/?search=" + search.value)
      })
    }
  }
  
  function handleSearchClear(){
    dispatch(onFilterSearchChange(""))
    dispatch(onSearchChange(""))
    return  Preload.Load("/q", () => {
      navigate("/q")
    })
  }
  
  return (
    <div>
      <div className="mobile_search_box">
        
        <form onSubmit={handleSearch}>
          <div className="input">
            <input value={search.value} onChange={onChangeSearch} type="text" placeholder="Search products"/>
            <div className="flex items-center">
              { search.value && <button type="button" className="search_clear_icon">
								<FontAwesomeIcon icon={faTimesCircle} onClick={handleSearchClear} />
							</button>}
              <button type="submit" className="search_go">
                <FontAwesomeIcon icon={faSearch} className="text-sm" />
              </button>
            </div>
          </div>
        </form>
        
        <button className="filter_btn">
          <Preload to="/q">
            <FontAwesomeIcon icon={faFilter} className="text-sm" />
          </Preload>
        </button>
      </div>
    </div>
  );
};

export default Search;