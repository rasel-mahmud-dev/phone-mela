import React from "react";



let div;

let showStep3Id_Arr=[]
let hideStep3Id_Arr=[]


let falseDisturb_hiddenID2_Arr = []
let falseDisturb_showID2_Arr = []


let falseDisturb_hiddenID_Arr = []
let falseDisturb_showID_Arr = []

const MyTransition = (props) => {

  const { unmount, state, timeout, className, children } = props
  
  // Show Animation..........
  const [enter, setEnter] = React.useState(false);
  const [enterActive, setEnterActive] = React.useState(false);
  const [entered, setEntered] = React.useState(false);

   // Hidden Animation
  const [exitEnter, setExitEnter] = React.useState(false);
  const [exitActive, setExitActive] = React.useState(false);
  const [exited, setExited] = React.useState(null);


  const [ isShow, setShow] = React.useState(false)
  const [ unmountOnDom, setUnmountOnDom] = React.useState(false)
  const [ trueDisturb, setTrueDisturb  ] = React.useState(false)
  const [ falseDisturb, setFalseDisturb  ] = React.useState(false)


  const [preMount, setPreMount] = React.useState(false)

  const [timeIn, setTimeIn] = React.useState(false)
  const [timeOut, setTimeOut] = React.useState(false)

  const html = React.createRef(null)
  
  const [ timeHistory, setTimeHistory ] = React.useState([])
  const [ last, setLast ] = React.useState(0)

  React.useEffect(()=>{
    if(html.current){
      if(html.current.scrollHeight > 0){
        div = html.current
      }
    }
  }, [preMount, setPreMount])

  React.useEffect(()=>{

    setTimeHistory([...timeHistory, Date.now(), last])
      let timeStamp;
      if(timeHistory.length >= 4){
        timeStamp = timeHistory[timeHistory.length - 2] -  timeHistory[timeHistory.length - 1]
      } 

      if(timeHistory.length > 0){
        myFunction(timeStamp)
      } 
      if(timeHistory.length >= 6){
        setTimeHistory([0, 0, timeHistory[timeHistory.length - 2],  timeHistory[timeHistory.length - 1],  ])
      }
      
      setLast(Date.now())  

      return ()=>{
        let g = [
          showStep3Id_Arr,
          hideStep3Id_Arr,
          falseDisturb_hiddenID2_Arr,
          falseDisturb_showID2_Arr,
          falseDisturb_hiddenID_Arr,
          falseDisturb_showID_Arr
        ]
        g.forEach(arr=>{
          if(arr.length > 0){
            arr.forEach(r=>{
              clearTimeout(r)  // this is most important
            })
          }
        })
        
        showStep3Id_Arr = []
        hideStep3Id_Arr = []
        falseDisturb_hiddenID2_Arr = []
        falseDisturb_showID2_Arr = []
        falseDisturb_hiddenID_Arr = []
        falseDisturb_showID_Arr = []
      }

  }, [state])




  React.useEffect(()=>{
    if(typeof timeout === 'object'){
      setTimeIn(timeout.in)
      setTimeOut(timeout.out)
    } else{
      setTimeIn(timeout)
      setTimeOut(timeout)
    }
    
  }, [0])

  function myFunction(timeStamp){

    if(isShow){
      // console.log("isShow True");
      // content hidden............

      // hideStep3Id_Arr=[]

      if( isShow && timeStamp <= timeOut){
        // console.log("false disturb ------", timeStamp);
        //? clear previous timeout.....
        hideStep3Id_Arr.forEach(id=>{
          clearTimeout(id)
          // console.log("clear showStep3Id");
        })
        hideStep3Id_Arr = []

        if(falseDisturb){
          //? here should be hide animation
          // console.log("falseDistrub true");
          
          //- clear previous timeout
          falseDisturb_showID2_Arr.forEach(id=>{
            clearTimeout(id)
            // console.log("Clear falseDisturb_showID2_Arr");
          })
          falseDisturb_showID2_Arr = []

          if(div){
            div.style.maxHeight = 0
          }
          // setUnmountOnDom(false)  
          setEntered(false)
          setEnter(false)
          setEnterActive(false)
          
          setExitEnter(true)
          setExitActive(true)
    
          let falseDisturb_hiddenID2 = setTimeout(()=>{
            setExitEnter(false)
            setExitActive(false)
            setExited(true)
            setShow(false)
            if(unmount){  //> unmount from dom
              setUnmountOnDom(true)
            }
            // console.log("falseDisturb_show hide final");
          }, timeOut)
          falseDisturb_hiddenID2_Arr.push(falseDisturb_hiddenID2)

          setFalseDisturb(false)

        } else{
          //? here should be show animation
          // console.log("falseDistrub false");

          falseDisturb_hiddenID2_Arr = []
          falseDisturb_showID2_Arr = []
         
          //: clear previous timeout
          falseDisturb_hiddenID2_Arr.forEach(id=>{
            clearTimeout(id)
            // console.log("Clear falseDisturb_showID2_Arr");
          })
          falseDisturb_hiddenID2_Arr = []
         
          setUnmountOnDom(false)  // need mount content before animated 
          setPreMount(true)       // need mount content before animated 
          
          setTimeout(()=>{
            setExitEnter(false)
            setExitActive(false)
            setExited(false)

            setEntered(false)
            setEnter(true)
            setEnterActive(true)
            if(div){
              div.style.maxHeight = div.scrollHeight + "px"
            }
            // console.log("falseDistrub false show 2nd step");
          })
          let falseDisturb_show2ID =setTimeout(()=>{
            setEnter(false)
            setEnterActive(false)
            setEntered(true)
            setShow(true)
            // console.log("falseDistrub false show final");
          }, timeIn)
          falseDisturb_showID2_Arr.push(falseDisturb_show2ID)
          setFalseDisturb(true)
        }

      } else{
        //:::: ???? Hidden State Start ????????????? 
        if(div){
          div.style.maxHeight = 0
        }
        // setUnmountOnDom(false)  
        setEntered(false)
        setEnter(false)
        setEnterActive(false)
        
        setExitEnter(true)
        setExitActive(true)
  
        let hideStep3Id = setTimeout(()=>{
          setExitEnter(false)
          setExitActive(false)
          setExited(true)
          setShow(false)
          if(unmount){  //> unmount from dom
            setUnmountOnDom(true)
          }
        }, timeOut)
        hideStep3Id_Arr.push(hideStep3Id)


      }

    //:::: ???? Hidden State End ????????????? 
    } else{
      // showStep3Id_Arr=[]
      if(!isShow && timeStamp <= timeIn){
        // console.log("true disturb ------", timeStamp);
        showStep3Id_Arr.forEach(id=>{
          clearTimeout(id)
          // console.log("clear showStep3Id");
        })
        showStep3Id_Arr = []

        if(trueDisturb){
          //? we need show our animation......
          // console.log("trueDisturb");

          //? clear previous timeout.....
          falseDisturb_hiddenID_Arr.forEach(id=>{
            clearTimeout(id)
            // console.log("clear falseDisturb_hiddenID_Arr");
          })
          falseDisturb_hiddenID_Arr = []

          setUnmountOnDom(false)  // need mount content before animated 
          setPreMount(true)       // need mount content before animated 
          
          setTimeout(()=>{
            setExitEnter(false)
            setExitActive(false)
            setExited(false)

            setEntered(false)
            setEnter(true)
            setEnterActive(true)
            if(div){
              div.style.maxHeight = div.scrollHeight + "px"
            }
            // console.log("show 2nd step");
          })
          let falseDisturb_showID =setTimeout(()=>{
            setEnter(false)
            setEnterActive(false)
            setEntered(true)
            setShow(true)
            // console.log("falseDisturb_show show final");
          }, timeIn)
          falseDisturb_showID_Arr.push(falseDisturb_showID)

          setTrueDisturb(false)

        } else{
          //? we need hide our animation......
          // console.log("falseDisturb why hide it", exited);
          if(exited){
            // show animation........
            
            //! Shown
            // console.log("this is really bug");
            setUnmountOnDom(false)  // need mount content before animated 
            setPreMount(true)       // need mount content before animated 
            
            setTimeout(()=>{
              setExitEnter(false)
              setExitActive(false)
              setExited(false)

              setEntered(false)
              setEnter(true)
              setEnterActive(true)
              if(div){
                div.style.maxHeight = div.scrollHeight + "px"
              }
              // console.log("falseDistrub false show 2nd step");
            })
            let falseDisturb_hiddenID =setTimeout(()=>{
              setEnter(false)
              setEnterActive(false)
              setEntered(true)
              setShow(true)
              // console.log("falseDistrub false show final");
            }, timeIn)
            falseDisturb_hiddenID_Arr.push(falseDisturb_hiddenID)

          } else{
            // console.log("this is really bug else");
            //! Hide 
            //? clear previous timeout.....
            falseDisturb_showID_Arr.forEach(id=>{
              clearTimeout(id)
              // console.log("Clear falseDisturb_showID_Arr");
            })

            if(div){
              div.style.maxHeight = 0
            }
            // setUnmountOnDom(false)  
            setEntered(false)
            setEnter(false)
            setEnterActive(false)
            
            setExitEnter(true)
            setExitActive(true)
      
            let falseDisturb_hiddenID = setTimeout(()=>{
              setExitEnter(false)
              setExitActive(false)
              setExited(true)
              setShow(false)
              if(unmount){  //> unmount from dom
                setUnmountOnDom(true)
              }
              // console.log("falseDisturb_show hide final");
            }, timeOut)
            falseDisturb_hiddenID_Arr.push(falseDisturb_hiddenID)
          }

          setTrueDisturb(true)
        }

      } else{

        falseDisturb_hiddenID_Arr = []
        falseDisturb_showID_Arr = []


        // console.log("isShow False");
        // content show............
        setUnmountOnDom(false)  // need mount content before animated 
        setPreMount(true)       // need mount content before animated 
        
        setTimeout(()=>{
          setExited(false)
          setEntered(false)
          setEnter(true)
          setEnterActive(true)
          if(div){
            div.style.maxHeight = div.scrollHeight + "px"
          }
          // console.log("show 2nd step");
        })
        let showStep3Id = setTimeout(()=>{
          setEnter(false)
          setEnterActive(false)
          setEntered(true)
          setShow(true)
          // console.log("show final");
        }, timeIn)
        showStep3Id_Arr.push(showStep3Id)
      }



    }
  }


  return (
  
      <div ref={html} className={[
      className, 
      enter ? "enter" : "",
      enterActive ? "enter-active" : "",
      entered ? "enter-done" : "",

      exitEnter ? "exit-enter" : "",
      exitActive ? "exit-active" : "",
      exited ? "exited" : ""
    ].join(" ")}>
      { preMount && !unmountOnDom && children }
    </div>
   
  )
};


export default MyTransition;



// <MyTransition  state={state} unmount timeout={{in:1000, out: 500}} className="showCode" >
//       {children}
//    </MyTransition>


// .showCode{
//   max-height: 0;
//   overflow: hidden;
//   margin: 0;
//   padding: 0;

//   &.exit-enter,
//   &.exit-active{
//     // background: green;
//     transition: all .5s ease;
//     max-height: 0;
//   }
//   &.exit-done{
//     transition: all .5s ease;
//     // background: red;
//     max-height: 0;
//   }

//   &.enter,
//   &.enter-active{
//     transition: all 1s ease;
//   }

//   &.enter-done{
//     // background: rgb(56, 151, 196);
//     transition: all .5s ease;
//   }
// }