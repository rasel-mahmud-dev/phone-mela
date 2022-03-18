import React from 'react'

let action = false;

const Animation = (props) => {
  const { state, className, timeout, children } = props

  let [exit, setExit] = React.useState(false);
  let [enter, setEnter] = React.useState(false);
  let [entered, setEntered] = React.useState(false);

  let startTime = 0;
  let currentTime = 0



  if(state){

    action = true;

    if(!action){
      setEnter(true)
      console.log("DSSSSSSSSSSSSSSSS");
    }


    // startTime = Date.now() + timeout  
    // setTimeout(() => {
    //   currentTime = Date.now()
    //   if(currentTime > startTime) {
    //     setEntered(true)
    //   }
    // }, 1000);
  } 

  
  

  return (
    <React.Fragment>
      { enter && <div className={[className, state ?  "showw"  : ""].join(" ")}>
        { children  }
      </div>
      }

    </React.Fragment>
  )
}

export default Animation
