import {Params, useParams} from "react-router-dom";
import React, {ComponentType} from "react";

type TParamsProps = {
  params: Params<string>;
}

function withParams(Component: any) {
  return function (props: any){
    let p = useParams()
    // @ts-ignore
    return <Component {...props} params={p}  />
  }
};


// function withParams(HOC: any){
//   return function (props: any) {
//     const params = useParams()
//     return <HOC {...props} params={params} />
//   }
// }

export default withParams