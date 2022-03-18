import React from 'react'
import ReactDOM from 'react-dom'

import './Backdrop.scss'

const backdrop = (props)=> {
  const { isOpenBackdrop, bg, style, onCloseBackdrop, transparent, children } = props

  const handleBackdrop=(e)=>{
    if(e.target.classList.contains("backdrop")){
      if(onCloseBackdrop)
        props.onCloseBackdrop()
    }
  }

  let styles = {...style}
  if(bg){
    styles.background = bg
  }

  return ReactDOM.createPortal(
    <div style={styles} onClick={handleBackdrop} className={['backdrop', isOpenBackdrop ? 'open' : 'close', transparent ? 'bg-transparent' : '' ].join(' ')}>{children}</div>,
    document.querySelector('#backdrop-root')
  )
}

export default backdrop