import {useLocation} from "react-router-dom";
import React from "react";

function withLocation(HOC: any){
  return function (props: any){
    const location = useLocation()
    return <HOC {...props} location = {location} />
  }
}

export default withLocation