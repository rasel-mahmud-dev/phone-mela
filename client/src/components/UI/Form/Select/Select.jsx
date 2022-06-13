import React, { useRef, useEffect} from 'react'
import classnames from 'classnames'

import './Select.scss'

const Select = (props) => {
  const { name, size="md", optionsName, inputDisable, optionSingleValue, label, pos, value, theme, type="text", id, className, error, tauched, onChange, onBlur, options=[] } = props

  const [ isSuggetion, setSuggetion ]  = React.useState(false)
  const [ isFocused, setFocus ] = React.useState(false)

  const [ lastErrorMessage, setLastErrorMessage ] = React.useState('')
  const [ selectionValue, setSelectionValue ]  = React.useState('')

  const input = React.createRef()
  const component = useRef(null)
  const prevErrorRef = useRef()  

  useEffect(()=>{
    if(prevErrorRef.current){
      setLastErrorMessage(prevErrorRef.current.innerHTML);
    }
  }, [error])

  useEffect(()=>{
    window.addEventListener("click", handleClickOutSide, true)
    return ()=>{
      window.removeEventListener('click', handleClickOutSide, true)
    }
  }, [0])


  function onChang(e){
    if(onChange)
      onChange(e.target.name, e.target.value)
  }

  function handleClickOutSide(e){
    if(component.current && !component.current.contains(e.target)){
      setSuggetion(false)
    }
  }



  function showSuggetion(e){
    setSuggetion(!isSuggetion)   
  }


  function selectItem(e, item){
    let input = e.target.parentElement.parentElement.querySelector('input')    
    let newStrValue = input.value.replace(selectionValue, '') 
    if(optionSingleValue){
      if(optionsName){input.value = item[optionsName.item]} 
      else{input.value = item}
    } else{
      input.value = newStrValue + item[optionsName.item]
    }

    if(onChange){
      if(optionsName){
        onChange(input.name, item)
      } else{
        onChange(input.name, input.value)
      }
    }
    setSuggetion(false)
  }

  function showInputHandler(e){
    if(inputDisable){
      setSuggetion(!isSuggetion)   
    }
    setFocus(true)
    if(input){
      input.current.focus()      
    }
  }

  const handleBlur=(e)=>{
    if (onBlur) {
      onBlur(e);
    }
    if(input){
      if(!input.current.value){
        setFocus(false)
      }     
    }
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

    let chevonStyle = {}
    if(pos){
      if(pos.top) chevonStyle.top = pos.top
      if(pos.bottom) chevonStyle.bottom = pos.bottom
      if(pos.right) chevonStyle.right = pos.right
      if(pos.left) chevonStyle.left = pos.left
    }

  let groupClasses = classnames("input_group select", size && size, theme && `input_group_${theme}`) 
  

  return (
    <div ref={component} onClick={showInputHandler} className={groupClasses}>
     
        <label 
          className={[
            isFocused || value ? "expand_label" : "collapse_label",
            error && tauched ? "error_label" : "",
            error && !value && !isFocused ?  "collapse_error_label" : "",
            size && `label-${size}`
          ].join(" ")}
          htmlFor={name}>{label}
        </label>

        <div className="input_wrapper">
          <div ref={prevErrorRef} 
            className={[
              "error_message",
              error && tauched ? "show_error_message" : "hide_error_message",
              error && !value && !isFocused ?  "collapse_show_error_message" : ""
            ].join(" ")}>{ error || lastErrorMessage  }
          </div>
          
          <input  
            ref={input} 
            name={name}
            type={type} 
            id={id} 
            disabled={inputDisable}
            value={value} 
            onSelect={handleSelect}
            onChange={onChang} 
            onBlur={handleBlur}
            className={[className, isFocused || value ? 'expand_input' : 'collapse_input'].join(" ")} 
          />

          <div style={chevonStyle} onClick={showSuggetion}  className="switch_select">
            <i className={['fa fa-chevron-up', isSuggetion ? 'chevron_up': 'chevron_down'].join(" ")} aria-hidden="true"></i>
          </div>

          { isSuggetion && (
            <div className="suggetion_list">
              { options.map((o, i)=><li onClick={(e)=>selectItem(e, o)} className="suggetion_item" key={i} >{ optionsName ? o[optionsName.item] : o}</li>) }
            </div>
          ) }
          
          <span className={[
            "input_border",
            tauched || isFocused ? "expand_input_border" : "",
            tauched || !isFocused ?  "collapse_input_border" : "",
            error ? "input_border_error" : '' ].join(" ")}>
          </span>

        </div>  
            
    </div>
  )
}

export default Select
