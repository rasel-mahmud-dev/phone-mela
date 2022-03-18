import React from "react";



let hiddenTimeOut3Arr = []
let mountOnDalay3_Arr = []
let mountInterrpt_False_hidden_ani_Arr = []
let mountInterrpt_True_show_ani_Arr = []

let unmountInterrpt_False_hidden_ani_Arr = []
let unmountInterrpt_True_show_ani_Arr = []

let historyTrue = [];
let state_True_Last = Date.now();

let mountInterrpt = false
let unmountInterrpt = false

const MyTransition = (props) => {

  const { unmount, state, timeout, className, html, children } = props
  
  // Show Animation..........
  const [enter, setEnter] = React.useState(false);
  const [enterActive, setEnterActive] = React.useState(false);
  const [entered, setEntered] = React.useState(false);

  const [initialMount, setInitialMount] = React.useState(false);
  

  // Hidden Animation
  const [exit, setExitEnter] = React.useState(false);
  const [exitActive, setExitActive] = React.useState(false);
  const [exited, setExited] = React.useState(null);
  const [ unmountDom, setUnmountDom] = React.useState(false);
  const [ actualState, setActualState ] = React.useState(false)

  const [ isShow, setShow ] = React.useState(null)
  const [ getHeight, setHeight ] = React.useState(true)


  React.useEffect(()=>{
    // if(html.current){
    //   if(html.current.scrollHeight > 0){
    //     let ani = html.current.parentElement
    //     ani.style.maxHeight = html.current.scrollHeight + "px"
    //   }
    // } 
    console.log(children);
  }, [initialMount, setInitialMount, setExited])


  React.useEffect(()=>{
    // console.log(html.current);
    historyTrue.push(Date.now(), state_True_Last)  

    if(state !== null){
      let timeStamp;
      if(historyTrue.length > 4){
        timeStamp = historyTrue[historyTrue.length - 2] -  historyTrue[historyTrue.length - 1]
      } 
      // myFunction(timeStamp)
    }  
    state_True_Last = Date.now()

  }, [state])


  function myFunction(timeStamp){
    if(isShow){
      // console.log("isShow True ---- hide animation");
     
      if(html.current){
        let ani = html.current.parentElement
        // console.log(ani);
        ani.style.maxHeight = 0
      } 

      setExitEnter(true)
      setExitActive(true)
      setActualState(false) // for change className...........


      let hiddenTimeOut3 = setTimeout(()=>{
        setExitEnter(false)
        setExitActive(false)
        setExited(true)   // for dom unmount
        setInitialMount(false)  // for dom unmount
        setUnmountDom(false)  
        if(unmount) setUnmountDom(true)

        // console.log("isShow True ---- finaly step hidden");
        setShow(false);  //? animation complete now switch another state...
      }, timeout)
      hiddenTimeOut3Arr.push(hiddenTimeOut3)

      if(timeStamp && timeStamp <= timeout){
        // console.log("unmount Interrupt");
        // console.log("isShow True dauble click---", timeStamp);
        hiddenTimeOut3Arr.forEach(id =>{
          // console.log("clear hiddenTimeOut3..");
          clearTimeout(id)
        })
        hiddenTimeOut3Arr = []


        if(unmountInterrpt){
          // console.log("unmountInterrpt true --unmount animation--");
          unmountInterrpt_True_show_ani_Arr.forEach(id =>{
            // console.log("clear unmountInterrpt True show");
            clearTimeout(id)
          })
          unmountInterrpt_True_show_ani_Arr = []

          if(html.current){
            let ani = html.current.parentElement
            // console.log(ani);
            ani.style.maxHeight = 0
          } 
          setExitEnter(true)
          setExitActive(true)
          setActualState(false) // for change className...........

          let unmountInterrpt_False_hidden_ani = setTimeout(()=>{
            setExitEnter(false)
            setExitActive(false)
            if(unmount){
              setUnmountDom(true)
              setExited(true)   // for dom unmount
              setInitialMount(false)  // for dom unmount
            } else{ 
              setUnmountDom(false)
              setExited(false)   // for dom unmount
              setInitialMount(true)  // for dom unmount       
            }
            // console.log("unmountInterrpt true --unmount animation-- final step");
            setShow(false);  //? animation complete now switch another state...
          }, timeout) 

          unmountInterrpt_False_hidden_ani_Arr.push(unmountInterrpt_False_hidden_ani)
          unmountInterrpt = false

        } else{
          // console.log("unmountInterrpt false --remount animation--");

          unmountInterrpt_False_hidden_ani_Arr.forEach(id=>{
            // console.log("clear unmountInterrpt true --unmount animation-- final step");
            clearTimeout(id)
          })
          unmountInterrpt_False_hidden_ani_Arr = []

          setInitialMount(true)
          setExited(false)
          if(html.current){
            if(html.current.scrollHeight > 0){
              let ani = html.current.parentElement
              ani.style.maxHeight = html.current.scrollHeight + "px"
            }
          } 

          setActualState(true)      
          setEnter(true)
          setEnterActive(true)
          
          let unmountInterrpt_True_show_ani = setTimeout(()=>{
            setEnter(false)
            setEnterActive(false)
            setEntered(true)  //? after long time..............
            setShow(true);   //? now animation is complete execution pass to hide state
            // console.log("unmountInterrpt True show final step");
          }, timeout)

          unmountInterrpt_True_show_ani_Arr.push(unmountInterrpt_True_show_ani)
          unmountInterrpt = true
        }

      }
    
    } else{

      // console.log("isShow False ---- show ---- animation");
      //> animation open........

      // console.log("isShow false, 1st step show");  
      // reset exit state......... 
      setInitialMount(true)
      setExitActive(false)
      setExitEnter(false)
      setExited(false)

      setActualState(true)      
      setEnter(true)
      setEnterActive(true)
      
      let mountOnDalay3_ID = setTimeout(()=>{
        // set final step state........(long lime after).....
        setEnter(false)
        setEnterActive(false)
        setEntered(true)  //? after long time..............
        setShow(true);   //? now animation is complete execution pass to hide state
        // console.log("isShow false show final step");
      }, timeout)
      mountOnDalay3_Arr.push(mountOnDalay3_ID)


      if(timeStamp && timeStamp <= timeout){
        // console.log("isShow False dauble click---", timeStamp);
        mountOnDalay3_Arr.forEach(id =>{
          // console.log("clear mountOnDalay3...");
          clearTimeout(id)
        })
        mountOnDalay3_Arr = []

        // setShow(false);  //? animation complete now switch another state...
        if(mountInterrpt){
          // console.log("mountInterrpt true --- show animation");
          
          mountInterrpt_False_hidden_ani_Arr.forEach(id =>{
            // console.log("clear mountInterrpt False - finaly step hidden...");
            clearTimeout(id)
          })
          mountInterrpt_False_hidden_ani_Arr = []

          setInitialMount(true)
          setExited(false)
          if(html.current){
            if(html.current.scrollHeight > 0){
              let ani = html.current.parentElement
              ani.style.maxHeight = html.current.scrollHeight + "px"
            }
          } 

          setActualState(true)      
          setEnter(true)
          setEnterActive(true)
          
          let mountInterrpt_True_show_animation = setTimeout(()=>{
          // set final step state........(long lime after).....

            setEnter(false)
            setEnterActive(false)
            setEntered(true)  //? after long time..............
            setShow(true);   //? now animation is complete execution pass to hide state
            // console.log("mountInterrpt True show final step");
          }, timeout)

          mountInterrpt_True_show_ani_Arr.push(mountInterrpt_True_show_animation)

          mountInterrpt = false

        } else{
          // isShow_False_TimeOut = 500
          // console.log("mountInterrpt False --- hide animation");

          mountInterrpt_True_show_ani_Arr.forEach(id =>{
            // console.log("clear mountInterrpt True show final step...");
            clearTimeout(id)
          })
          mountInterrpt_True_show_ani_Arr = []

          if(html.current){
            let ani = html.current.parentElement
            ani.style.maxHeight = 0
          } 
          setExitEnter(true)
          setExitActive(true)
          setActualState(false) // for change className...........

          let mountInterrpt_False_hidden_ani = setTimeout(()=>{
            setExitEnter(false)
            setExitActive(false)
            if(unmount){
              setUnmountDom(true)
              setExited(true)   // for dom unmount
              setInitialMount(false)  // for dom unmount
            } else{ 
              setUnmountDom(false)
              setExited(false)   // for dom unmount
              setInitialMount(true)  // for dom unmount       
            }
            // console.log("mountInterrpt False - finaly step hidden");
            setShow(false);  //? animation complete now switch another state...
          }, timeout) 
          mountInterrpt_False_hidden_ani_Arr.push(mountInterrpt_False_hidden_ani)

          mountInterrpt = true
        }
      }
    }
  }
  
  
  return (
    <div>
      {/* { getHeight && children } */}
    </div>
  )
        
  
  // return exited !== null && initialMount !== false  ? 

  //   ( <div className={[className, 
  //           actualState && enter ? "enter" : "",
  //           actualState && enterActive ? "enter-active" : "",
  //           actualState && entered ? "enter-done" : "",
  //           // initialMount ? "initial-mount": "",
  //           !actualState && exit ? "exit-enter" : "",
  //           !actualState && exitActive ? "exit-active" : "",
  //           !actualState ? (exited || !unmountDom) ? "exit-done" : "" : "",
  //         ].join(" ")}> 
  //           { children }
  //         </div>

  //     ) : ""
        
        
  
      

  


  // return (
  //   <div>
  //     { <div className={["myAnimation", 
  //       actualState && enter ? "enter" : "",
  //       actualState && enterActive ? "enter-active" : "",
  //       actualState && entered ? "enter-done" : "",
  //       // initialMount ? "initial-mount": "",
  //       !actualState && exit ? "exit-enter" : "",
  //       !actualState && exitActive ? "exit-active" : "",
  //       !actualState ? (exited || !unmountDom) ? "exit-done" : "" : "",
  //     ].join(" ")}>
  //      { exited !== null && initialMount !== false ? <div>
  //         { children }
  //         </div> 
  //       : ''
  //     }  
      
  //     </div>
  //     }

  //   </div>
  // );
};


export default MyTransition;


