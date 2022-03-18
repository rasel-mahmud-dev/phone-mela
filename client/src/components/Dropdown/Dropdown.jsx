import React from "react";

import "./Dropdown.scss";

const Dropdown = props => {
  const { isShow } = props
  return (
    <React.Fragment>
      {isShow ? props.children : null}
    </React.Fragment>
  )
};


export default Dropdown;

