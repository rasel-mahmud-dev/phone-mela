
import React,  { useRef, useEffect } from 'react'
import classnames from 'classnames'
import './Textarea.scss'


const Textarea = (props)=>{
  let { theme, label, as, value, setOption, options, maxHeight="100", name, type="text", onChange, onBlur, error, tauched } = props

  const [isFocused, setFocus] = React.useState(false)
  const [isShowPass, setShowPass] = React.useState(false)
  const [renderShowPass, setRenderShowPass] = React.useState(false)
  const [lastErrorMessage, setLastErrorMessage] = React.useState('')
  const [textareaHeight, setTextareaHeight] = React.useState(15)
  const [ isSuggetion, setSuggetion ]  = React.useState(false)
  const [ selectionValue, setSelectionValue ]  = React.useState('')

  const textArea = React.createRef()
  const component = useRef(null)


  const prevErrorRef = useRef()
  React.useEffect(() => {
    if( prevErrorRef.current){
      setLastErrorMessage(prevErrorRef.current.innerHTML);
    }
    if(textArea.current){
      if(textArea.current.scrollHeight > maxHeight){
        setTextareaHeight(textArea.current.scrollHeight)
      }
    }
  }, [error])

  useEffect(()=>{
    window.addEventListener("click", handleClickOutSide, true)
    return ()=>{
      window.removeEventListener('click', handleClickOutSide, true)
    }
  }, [0])

  function showInputHandler(e){
    setFocus(true)
    if(textArea){
      textArea.current.focus()      
    }
  }
  
  const handleBlur=(e)=>{
    if(onBlur){
      onBlur(e)
    }

    if(textArea){
      if(!textArea.current.value && !error && !tauched){
        setFocus(false)
      }     
    }
  }
  
  function showSuggetion(e){
    setSuggetion(!isSuggetion)   
  }

  function handleClickOutSide(e){
    if(component.current && !component.current.contains(e.target)){
      setSuggetion(false)
    }
  }


  function selectItem(e, item){
    let textArea = e.target.parentElement.parentElement.querySelector('textArea')
    let newStrValue = textArea.value.replace(selectionValue, '') 
    textArea.value = newStrValue + item
    onChange(textArea.name, textArea.value)
    setSuggetion(false)
  }


  const showPassword=(e)=>{
    setShowPass(!isShowPass)
  }

  let groupClasses = classnames("input_group", theme && `input_group_${theme}`) 

  function onChang(e){

    if(e.currentTarget.scrollHeight < maxHeight){
      setTextareaHeight(e.currentTarget.scrollHeight)
      if(e.currentTarget.scrollTop === 0){
      }
    }
    
    if(e.target.name === 'password'){
      if(e.target.value){
        setRenderShowPass(true)
      }else{
        setRenderShowPass(false)
      }
    }
    onChange(e.target.name, e.target.value)
  }  

  // store selection / Mark string  inside selectionValue  ... State
  function handleSelect(e){
    const end = e.target.selectionEnd
    const start = e.target.selectionStart
    const selectValue = e.target.value.slice(start, end) 
    if(selectValue){
      setSelectionValue(selectValue);
    }
  }

  // console.log(prevState(error));
  

  return(
    <div ref={component} onClick={showInputHandler} className={groupClasses}>

      <label 
        className={[isFocused || value ? 'expand_label' : 'collapse_label', error && tauched ? 'error_label' : ''].join(" ")} 
        htmlFor={name}>{label}
      </label>


      <div className="input_wrapper">
        <div ref={prevErrorRef}  className={["error_message", error && tauched ? 'show_error_message' : 'hide_error_message'].join(" ")}>{ error || lastErrorMessage }</div>
        <textarea
          style={{height: `${textareaHeight}px`}}
          ref={textArea}
          value={value}
          onSelect={handleSelect}
          onChange={onChang}
          onBlur={handleBlur}
          className={[isFocused || value ? 'expand_input' : 'collapse_input'].join(" ")}
          type={type === 'password' ? isShowPass ? 'text' : type : type}
          name={name}
        />

        {as === 'password' && renderShowPass &&  (  
          <div onClick={showPassword} className="show_password_icon">
            <i className={['far', isShowPass ? 'fa-eye-slash' : 'fa-eye'].join(" ")}></i>
          </div>  
        )} 

        {setOption && (
          <React.Fragment>
            <div onClick={showSuggetion}  className="switch_select">
            <i className={['fa fa-chevron-up', isSuggetion ? 'chevron_up': 'chevron_down'].join(" ")} aria-hidden="true"></i>
          </div>
    
          { isSuggetion && (
            <div className="suggetion_list">
              { options.map((o, i)=><li onClick={(e)=>selectItem(e, o)} className="suggetion_item" key={i} >{o}</li>) }
            </div>
          ) }
          </React.Fragment>
        )}

        <span className={["textArea_border", isFocused || value ? "expand_input_border" : "collapse_input_border"].join(' ')}></span>
      </div>
    </div> 
  )
}

export default Textarea