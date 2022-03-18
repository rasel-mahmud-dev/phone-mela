import React from 'react'
import ReactDOM from 'react-dom'
import Animation from 'components/Animation/Animation'
import './Modal.scss'


const Modal = (props) =>{ 
  let { isOpenModal, title, onCloseModal, alert, error, success } = props
  
  return ReactDOM.createPortal(
    <Animation in={isOpenModal} unmountOnExit timeout={500}>
      <div shown="modal_show" hidden="modal_hide" className={["modal_wrapper", alert || !title ? 'alert_modal' : ''].join(" ")}>
        <div className={["modal", success ? 'modal_success' : error ? 'modal_error' : ''].join(" ")}>
          { !alert || title && <div className="modal_header">
            <div className="modal_title">{title}</div>
              <i onClick={onCloseModal} className="close_modal_icon far fa-times"></i>
            </div> 
          }
          <div className={[alert || !title ? "alert_modal_body" : "modal_body"].join(" ")}>{props.children}
            {alert || !title  && <i onClick={onCloseModal} className="close_modal_icon far fa-times"></i>}
          </div>
        </div>
      </div>
     </Animation>,
    document.getElementById('modal-root')
  )
}


export default Modal
