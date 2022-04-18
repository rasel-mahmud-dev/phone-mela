
import React, {FC} from 'react';

import "./animation.scss";

interface AnimationProps {
  baseClass?: string,
  inProp: boolean
  onClick?: any
  children: any
}


const Animation = (props: AnimationProps) => {
  
  const { inProp = false, baseClass=""} = props
  
  const divRef = React.useRef<HTMLDivElement>(null)
  
  React.useEffect(()=>{
    if(divRef.current){
      let height = divRef.current.scrollHeight
      if(inProp){
        divRef.current.style.height = height + "px"
        divRef.current.classList.add(baseClass ? `${baseClass}__collapse` : "animation__expand")
        divRef.current.classList.remove(baseClass ? `${baseClass}__expand` : "animation__collapse")
      } else {
        divRef.current.style.height = 0 + "px"
        divRef.current.classList.add(baseClass ? `${baseClass}__expand` : "animation__collapse")
        divRef.current.classList.remove(baseClass ? `${baseClass}__collapse` : "animation__expand")
      }
    }
  }, [inProp])

  
  return (
    <div ref={divRef} className={baseClass ?  baseClass: "animation"}>
      {props.children}
    </div>
  );
};

export default Animation;