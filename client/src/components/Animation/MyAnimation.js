import React from "react";


import "./DummyPage.scss";


let idsCCC = [];
let idsDDD = [];
let idsAAA = [];
let idsAAA2 = [];
let idsBBB = [];
let last;

let idsIsShowTrue = []


let True_distrab_Id2RRR = []
let True_distrab_Id3RRR = []

const DummyPage = (props) => {
  const html = React.createRef(null)
  
  const [isShow, setShow] = React.useState(false);

  // Show Animation..........
  const [enter, setEnter] = React.useState(false);
  const [enterActive, setEnterActive] = React.useState(false);
  const [entered, setEntered] = React.useState(false);

  const [initialMount, setInitialMount] = React.useState(false);
  

  // Hidden Animation
  const [exit, setExit] = React.useState(false);
  const [exitActive, setExitActive] = React.useState(false);
  const [exited, setExited] = React.useState(null);
  const [unmount, setUnmount] = React.useState(true);
  const [ actualState, setActualState ] = React.useState(false)
  const [ distrub, setDistrub ] = React.useState(false)
  const [ ishowTrue_Distrub, setIshowTrue_Distrub ] = React.useState(false)
  


  const [timeout, setTimeOut] = React.useState(1000);
  // const [timeoutIn, setTimeOut] = React.useState(4000);
  

  React.useEffect(()=>{

    if(html.current){
      if(html.current.scrollHeight > 0){
        html.current.style.maxHeight = html.current.scrollHeight + "px"
      }
    } 

  }, [initialMount, setInitialMount, enterActive])


  
  
  let history = [];


  function handleClick(e) {

    history.push(e.timeStamp, last)


    let result;
    if(history.length > 1){
      // console.log(history);
      result = (history[history.length - 2] ) - (history[history.length - 1])
      result = Math.sign(result) !== -1  ? result : undefined
      history.forEach((h, i)=>{
        if(i >= history.length - 2){
          // history = [ h ]
        }
      })
    } 

    
    if(isShow){

      // unMount1("isShow true, Frist step step hidden")
      if(html.current){
        html.current.style.maxHeight = 0
      }
      console.log("isShow true, Frist step step hidden");
      setExit(true)
      setExitActive(true)
      setActualState(false) // for className state...........

      let timeOutId = setTimeout(()=>{
        setExit(false)
        setExitActive(false)
        setExited(true)            // for dom unmount
        setInitialMount(false)   // for dom unmount
        setActualState(false)
        console.log("isShow true, finaly step hidden");
        setShow(false);
      }, timeout)

      // let timeOutId = unMountOnDalay3("isShow true, finaly step hidden")
      idsIsShowTrue.push(timeOutId)      

      if( result && initialMount && result < timeout){
        console.log("isShow True dauble click before :  ", result);
        idsIsShowTrue.forEach(id =>{
          console.log("clear idsIsShowTrue");
          clearTimeout(id)
          idsIsShowTrue = []
        })

        // setShow(false); //>> pass execution to else block

        ;
        if(ishowTrue_Distrub){
          console.log("control manually true block..........");
          

          setActualState(true)
          setInitialMount(true)
          if(initialMount && html.current.scrollHeight > 0){
            html.current.style.maxHeight = html.current.scrollHeight + "px"
          }   
          let True_distrab_Id2 = setTimeout(()=>{
            // reset hide state
            setExit(false)
            setExitActive(false)
            setExited(false)
            setEnter(true)
            setEnterActive(true)
            setActualState(true)      
            console.log("control manually true block 2nd step.......");
          }, 10)
          True_distrab_Id2RRR.push(True_distrab_Id2)

          let True_distrab_Id3 = setTimeout(()=>{
            // set final step state........(long lime after).....
            setEnter(false)
            setEnterActive(false)
            setEntered(true)  // after long time..............
            setShow(false);   //? execution pass to ....isShow else block...... state
            setActualState(true)
            console.log("control manually true block final step.......");
          }, timeout)
          True_distrab_Id3RRR.push(True_distrab_Id3)


          setIshowTrue_Distrub(false)

        } else{

          console.log("control manually false block..........");

          True_distrab_Id3RRR.forEach(id =>{
            console.log("Clear True_distrab_Id2RRR");
            clearTimeout(id)
            True_distrab_Id3RRR = []
          })

          True_distrab_Id2RRR.forEach(id =>{
            console.log("Clear True_distrab_Id2RRR");
            clearTimeout(id)
            True_distrab_Id2RRR = []
          })

          // should be ... here.....
          setShow(false);
        
          setIshowTrue_Distrub(true)
        }
      }

      
    } else{

      console.log("isShow false, 1st step show");

      // initial mount for set element height............

      setActualState(true)
      setInitialMount(true)


      if(!initialMount && html.current.scrollHeight > 0){
        html.current.style.maxHeight = html.current.scrollHeight + "px"
      }
 
      
      let mountOnDalay2_ID = mountOnDalay2("isShow false show 2nd step")
      idsAAA2.push(mountOnDalay2_ID)


      let mountOnDalay3_ID = mountOnDalay3("isShow false show final step")
      idsAAA.push(mountOnDalay3_ID)
       

      //>>> Configure For When Animation Not Complete......................
      if( result && initialMount && result < timeout){
        // console.log("dauble click before :  ", result);

        //? clear TimeOut final Step.............
        idsAAA.forEach(id =>{
          
          // console.log("clear AAA");
          clearTimeout(id)
          idsAAA = []
        })

        //? clear TimeOut 2nd Step.............
        idsAAA2.forEach(id=>{
          // console.log("clear AAA2");
          clearTimeout(id)
          idsAAA2 = []
        })


        if(distrub){
          setDistrub(false)
          // console.log("distrub true ", distrub);

          idsBBB.forEach(id =>{
            // console.log("clear BBB");
            clearTimeout(id)
            idsBBB = []
          })
          
          setActualState(true)
          setInitialMount(true)
            
          if(initialMount && html.current.scrollHeight > 0){
            html.current.style.maxHeight = html.current.scrollHeight + "px"
          }        
    
          // let show2ndStepId = mountOnDalay2("distrub true show 2nd step")
          let show2ndStepId = mountOnDalay2("")
          idsCCC.push(show2ndStepId)

          // let showLastStepId = mountOnDalay3("distrub true show finaly step........")
          let showLastStepId = mountOnDalay3("")
          idsDDD.push(showLastStepId)

        } else{
          idsDDD.forEach(id =>{
            // console.log("clear DDD");
            clearTimeout(id)
            idsDDD = []
          })
        
          idsCCC.forEach(id =>{
            // console.log("clear CCC");
            clearTimeout(id)
            idsCCC = []
          })
        
          //>  Reuse Here Hide State...................
          if(html.current){
            html.current.style.maxHeight = 0            
          }

          // console.log("distrub false hidden state...............");
              
          setExit(true)
          setExitActive(true)
          
          let finalHiddenId  = unMountOnDalay3("")
          // let finalHiddenId  = unMountOnDalay3("distrub false hidden state finaly step........")
          idsBBB.push(finalHiddenId)
        
          setDistrub(true)

        }
      }
    }

    last = e.timeStamp
  }



  if( !enter &&  !enterActive && !entered && !isShow && exited ){
    setUnmount(true)
  } 


  function mountOnDalay3(message){
    return  setTimeout(()=>{
      // set final step state........(long lime after).....
      setEnter(false)
      setEnterActive(false)
      setEntered(true)  //? after long time..............
      setShow(true);   //? execution pass to hide state
      setActualState(true)
      console.log(message);
    }, timeout)

  }


  function mountOnDalay2(message){
    return setTimeout(()=>{
      // reset hide state
      setExit(false)
      setExitActive(false)
      setExited(false)

      console.log(message);
      setShow(false);
      setEnter(true)
      setEnterActive(true)
      setActualState(true)      

    }, 10)
  }




  function unMount1(message){
    if(html.current){
      html.current.style.maxHeight = 0
    }
    console.log(message);
    setExit(true)
    setExitActive(true)
    setActualState(false) // for className state...........
  }
  function unMountOnDalay3(message){
    return  setTimeout(()=>{
      setExit(false)
      setExitActive(false)
      setExited(true)            // for dom unmount
      setInitialMount(false)   // for dom unmount
      setActualState(false)
      console.log(message);
    }, timeout)
  }
  

  return (
    <div>
      <button onClick={handleClick}>Toggle</button>
      <div className="state">
        isShow: {isShow === null ? "null" : isShow ? "true" : "false"}
        <br/>
        actualState: {actualState && "true"}
        <br/>
        initialMount: {initialMount && "true"}
      </div>
      { <div ref={html} className={["myAnimation", 
        actualState && enter ? "enter" : "",
        actualState && enterActive ? "enter-active" : "",
        actualState && entered ? "enter-done" : "",
        initialMount ? "initial-mount": "",
        !actualState && exit ? "exit" : "",
        !actualState && exitActive ? "exit-active" : "",
        !actualState && exited ? "exit-done" : "",
      ].join(" ")}>
       { unmount && exited !== null && initialMount !== false ? <div>
          <h1 className="_sub_title">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Exercitationem accusamus impedit voluptates vero fuga sequi
              blanditiis. Possimus excepturi cumque facere!
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Exercitationem accusamus impedit voluptates vero fuga sequi
              blanditiis. Possimus excepturi cumque facere!
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Exercitationem accusamus impedit voluptates vero fuga sequi
              blanditiis. Possimus excepturi cumque facere!
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Exercitationem accusamus impedit voluptates vero fuga sequi
              blanditiis. Possimus excepturi cumque facere!
            </h1>
          </div> 
        : ''
      }  
      
      </div>
      }

    </div>
  );
};


export default DummyPage;



// function Animation(props){
//   const { timeout, state, children } = props

//   const [ delay, setDelay ] = React.useState(true)
//   const [ startDelay2, setStartDelay2 ] = React.useState(true)

//   let hiddenAnimationClass = "";
//   if(state){
//     hiddenAnimationClass = 'hidennnn'

//   }

//   let isShown = false;

//   let startTime;
//   if(state === true){
//     startTime = Date.now() + timeout
//   }

//   let id = setInterval(()=>{
//     if(Date.now() >= startTime  ){
//       clearInterval(id)
//       setDelay(false)
//       setStartDelay2(true);
//     }
//   })

//   let timeStart2;
//   if(!state && !delay){
//     setDelay(true)
//     timeStart2 = Date.now() + 10
//   }

//   let isLast = true;

//   let id2 = setInterval(()=>{
//     if(Date.now() >= timeStart2 ){
//       clearInterval(id2)
//       setStartDelay2(false);
//       isLast = isLast && Date.now() >= timeStart2
//       console.log(isLast);
//     }
//   })

//   // console.log(state);

//   return state && delay ?  (
//     <div className={hiddenAnimationClass}>
//       { delay && children }
//     </div>
//   ) :<div className={[!startDelay2  ? "showwwwww" : ""].join(" ")}>{ !state && children} </div>
// }
