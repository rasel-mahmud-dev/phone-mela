import React from 'react';

import "./Loader.scss"

const Loader = (props) => {
  const { isLoading, ...attributes} = props
  
  return (
    <div className="loader_root" {...attributes}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Loader;