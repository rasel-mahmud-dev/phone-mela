import React from 'react'
import { useHistory } from 'react-router-dom'

import { Container, Row, Col } from 'components/Layout'

import './Footer.scss'

const Footer = (props) => {

  const cur = React.useRef(null)

  const [ isFixed, setFixed ] = React.useState(false)
  const [ah, setAh]  = React.useState(0)
  const [wh, setWh]  = React.useState(0)
  const [pathname, setPathname]  = React.useState('')


  const history = useHistory()


  // React.useEffect(() => {

  //   // window.onload = function(e){
  //   //   setWh(window.innerHeight);
  //   //   let appHeight= cur.current.parentElement.offsetHeight
  //   //   setAh(appHeight);
  //   //   setFixed( appHeight < window.innerHeight ? true : false ) 
  //   //   console.log("onload");
      
  //   // }

  //   history.listen(location=>{
  //     setWh(window.innerHeight);
  //     let appHeight= cur.current.parentElement.offsetHeight
  //     setAh(appHeight);
  //     setPathname(location.pathname);
  //     setFixed( wh > ah ?  true  : false  ) 
  //     console.log("Hist",  ah > wh, );
  //     console.log(ah, wh);
     
  //       console.log( cur.current.parentElement.offsetHeight);
        
      
      

  //   })

    

  //   // if(cur){
  //   //   if(cur.current){
  //   //     window.onload = function(e){
  //   //       setPathname(window.document.location.pathname);
  //   //       setWh(window.innerHeight);
  //   //       let appHeight= cur.current.parentElement.offsetHeight
  //   //       setFixed( appHeight < window.innerHeight ? true : false ) 
  //   //     }
  //   //     window.addEventListener('resize', function(e){
         
  //   //       setWh(window.innerHeight);
  //   //       let appHeight= cur.current.parentElement.offsetHeight
  //   //       setFixed( appHeight < wh ? true : false )        
          
  //   //     })
  //   //   }
  //   // }

  //   // console.log(pathname);

  //   // // clear event when it unmount.....
  //   // return ()=>{
  //   //   window.removeEventListener('resize', function(e){
  //   //     setWh(window.innerHeight);
  //   //     let appHeight= cur.current.parentElement.offsetHeight
  //   //     setFixed( appHeight < wh ? true : false )        
  //   //   })
  //   // }
    
  
  // }, [pathname])  
  
  
  
  return (
    <div className={['footer', isFixed ? 'footer_fixed' : ''].join(' ')} >
      <Container fluid>
        <Row className="footer_content" alignItems="center" justify="center">
          <p>PoweredBy <strong>RaseL</strong></p>
        </Row>
      </Container>
      
    </div>
  )
}

export default Footer
