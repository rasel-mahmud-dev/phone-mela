import React from 'react'

import "./Input2.scss"

const Input2 = (props) => {

  const {
    label,
    error,
    tauched: initTauched, 
    value: initValue, 
    name,
    className,
    onChange, 
    type="text", 
    ...attributes 
  } = props

  const [ focus, setFocus ] = React.useState(false)
  const [ tauched, setTauched ] = React.useState(!!initTauched)
  const [ value, setValue ] = React.useState(initValue ? initValue : "")
  const [ errorMessage, setErrorMessage ] = React.useState(error ? error : false)
  const [ lastErrorMessage, setLastErrorMessage ] = React.useState('')


  const errorMessageRef = React.useRef(null)

  React.useEffect(()=>{
    setValue(initValue)
    setErrorMessage(error)
    setTauched(initTauched)
  }, [initValue, error, setErrorMessage, initTauched])
  
  
  
  function handleFocus(e){
    setFocus(true)
    setTauched(true)
  }
  function handleBlur(e){
    setFocus(false)
  }

  function handleChange(e){
    if(e.target.value === " "){
      setErrorMessage("Not Acceptable")
      setValue(e.target.value)
    }else{
      setValue(e.target.value)
      setErrorMessage(null)
    }
    if(onChange){
      onChange({target:{
        name: e.target.name && e.target.name, 
        value: e.target.value, 
        type: e.target.type && e.target.type
      }})
    }
    if(error){
      if(errorMessageRef.current){
        setLastErrorMessage(errorMessageRef.current.innerText)
      }
    }
  }


  return (
    <div className={["ooooo ", className, label ? "with-label": ""].join(" ")}>
      <div className="input_wrapper">

      <label htmlFor={name}
      className={[
        "input_label",
        focus ? "input_label--active" : "",
        ((value === 0) || value)  && !focus ? "input_label--active" : "",
        errorMessage ? "input_label--error input_label--active" : "",

        // !tauched && ((value !== 0) || value) && !focus ? "input_label--active" : "",
        // tauched && !((value !== 0) || value) && !focus ? "input_label--inactive" : "",
        // tauched && ((value !== 0) || value) && !focus ? "input_label--active" : ""
      ].join(" ")}
      >
        <span>{label} </span>
        <div ref={errorMessageRef} className={
          ["error-message", errorMessage ? "error-message--show" : "error-message--hidden"].join(" ")}>
        {errorMessage || lastErrorMessage}
      </div>
      </label>

     
      
      <div className="input">
        { type === "textarea" ? (
          <textarea
            {...attributes}
            name={name}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange} />
        ) : (
        <input
          {...attributes}
          type={type}
          name={name}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        ) }
      </div>

      <span 
        className={[
          "input_border", 
          focus ? "input_border--active" : "",
          focus && errorMessage ? "input_border--error" : "",
          !error && tauched && !focus ? "input_border--inactive" : "",
          error && tauched && !focus ? "input_border--active input_border--error" : ""
        ].join(" ")}
      />

    </div>
    </div>
  )
}

export default Input2
