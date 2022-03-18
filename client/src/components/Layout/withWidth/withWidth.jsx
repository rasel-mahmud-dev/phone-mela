import React from 'react'

const withWidth = (WrapperComponent) => {

  return function (props){  

    const [innerWidth, setinnerWidth] = React.useState(0);

    const [ screen, setScreen ] =  React.useState({ 
      col: { min: 0, max: 575 }, 
      sm: { min: 576, max: 767 }, 
      md: { min: 768, max: 991 },  
      lg: { min: 992, max: 1200 },  
      xl: { min: 1200, max: null }, 
    })


    React.useEffect(()=>{

      setinnerWidth(window.innerWidth);

      window.addEventListener("resize", handleScroll)
      return ()=>{
        window.removeEventListener("resize", handleScroll)
      }
    }, [0])

    function handleScroll(e){
      setinnerWidth(e.target.innerWidth);
    }

   

    function calculateScreenSize(innerWidth){
      // console.log(innerWidth);
      let winScreenSize = ''
      if( innerWidth > screen.col.min && innerWidth <= screen.col.max) winScreenSize = "col"
      if( innerWidth >= screen.sm.min && innerWidth <= screen.sm.max)  winScreenSize = "sm"
      if( innerWidth >= screen.md.min && innerWidth <= screen.md.max) winScreenSize = "md"
      if( innerWidth >= screen.lg.min && innerWidth < screen.lg.max) winScreenSize = "lg"
      if( innerWidth >= screen.xl.min ) winScreenSize = "xl"
      return winScreenSize
    }

    let winScreenSize = calculateScreenSize(innerWidth);
    

    function isDown(size){
      for (const key in screen) {
        if(key === size){
          return (screen[key].max >= innerWidth) ? true : false
        }
      }
    }

    function isUp(size){
      for (const key in screen) {
        if(key === size){
          return (screen[key].max + 1 <= innerWidth) ?  true : false
        }
      }
    }

    return <WrapperComponent isUp={isUp} isDown={isDown} winScreenSize={winScreenSize} innerWidth={innerWidth}  {...props}/> 
  
  }

}

export default withWidth

