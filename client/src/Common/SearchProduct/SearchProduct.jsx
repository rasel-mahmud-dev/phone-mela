import React from 'react';
import {connect} from 'react-redux';
import Input2 from "src/components/Form/Input/Input2";
import {changePage, fetchProducts, onSearchChange} from "src/store/actions/productAction";

const SearchProduct = (props) => {
  
  
  function handleChange(e){
    const { currentPage, perPageShow, sortValue:{ field, order }, filterGroup, search } = props.productState
    props.changePage(1)
    props.fetchProducts({
      currentPage: 1,
      perPageShow: perPageShow,
      sort: field,
      order: order,
      filterGroup: filterGroup,
      authorId: false,
      search: {...search, value: e.target.value }
    })
    props.onSearchChange(e.target.value)
    // this.props.changeFilter(filterGroup)
    // props.fetchProducts()
  }
  
  return (
    <div>
      <Input2
        name="name"
        value={props.productState.search.value}
        label="Search Product..."
        onChange={handleChange}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return { productState: state.productState };
}

export default connect(mapStateToProps, {changePage, onSearchChange, fetchProducts})(SearchProduct);