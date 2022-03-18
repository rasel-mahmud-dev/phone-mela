import React, {useState} from 'react'
import classnames from 'classnames'

import './Select2.scss'

const Select2 = (props) => {
  const {
    name,
    pos,
    label,
    inputDisable,
    type = "text",
    error,
    tauched,
    options = [],
    optionsName = {},
    value,
    placeholder,
    onChange,
    toggleOptionClick,
    onBlur
  } = props
  
  const [isShowSuggetion, setShowSuggetion] = useState(false)
  const [isInputTauched, setInputTauched] = useState(false)
  const [isInputError, setInputError] = useState('')
  
  const classes = classnames("input_group2 select")
  
  let chevonStyle = {}
  if (pos) {
    if (pos.top) chevonStyle.top = pos.top
    if (pos.bottom) chevonStyle.bottom = pos.bottom
    if (pos.right) chevonStyle.right = pos.right
    if (pos.left) chevonStyle.left = pos.left
  }
  
  React.useEffect(() => {
    if (error) {
      setInputError(error)
    } else {
      setInputError('')
    }
  }, [error])
  
  function handleShowSuggetion(e) {
    setShowSuggetion(!isShowSuggetion)
    toggleOptionClick(!isShowSuggetion)
  }
  
  function handleInputClick(e) {
    setInputTauched(true)
    if (inputDisable) {
      setShowSuggetion(true)
    }
  }
  
  function handleInputChange(e) {
    // onChange(e)
    if (onChange) {
      // onChange({target: { name: e.target.name, value: e.target.value }})
      onChange({target: {name: e.target.name, value: {name: "", _id: ""}}})
    }
  }
  
  function handleInputBlur() {
    setInputTauched(false)
  }
  
  
  function handleChooseOptionValue(item) {
    if (onChange) {
      onChange({target: {name: name, value: {name: item[optionsName.key], [optionsName.id]: item[optionsName.id]}}})
    }
    setShowSuggetion(false)
  }
  
  
  return (
      <div className={classes}>
        
        <label className={["select_label", isInputError ? "select_label_error" : ""].join(" ")}
               htmlFor={name}>{label}</label>
        <div className={["error_msg", error ? 'error_msg_show' : 'error_msg_hide'].join(" ")}>{error}</div>
        
        <div className="input_wrapper">
          <div className={["input_border", isInputTauched ? "input_border_focus" : "", isInputError ? "input_border_error" : ""].join(" ")}/>
          <div onClick={handleInputClick}
               className={["input", isInputTauched ? "input_focus" : "", isInputError ? "input_error" : ""].join(' ')}>
            <input
                style={{cursor: inputDisable ? "pointer" : "unset"}}
                type={type}
                name={name}
                disabled={inputDisable ? true : false}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onClick={handleInputClick}
            />
          </div>
          <div style={chevonStyle} onClick={handleShowSuggetion} className="switch_select">
            <i className={['fa fa-chevron-up', isShowSuggetion ? 'chevron_up' : 'chevron_down'].join(" ")} aria-hidden="true"/>
          </div>
          
          {isShowSuggetion && (
              <div className="select_options_list">
                {options && Array.isArray(options) && options.map(option => (
                    <li onClick={(e) => handleChooseOptionValue(option)}>{optionsName ? option[optionsName.key] : option}</li>
                ))}
              </div>
          )}
        
        </div>
      </div>
  )
}

export default Select2