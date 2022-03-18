import React from 'react'

import "./Input2.scss"

const Input2 = (props) => {

  const { label, 
    error:initError, 
    tauched: initTauched, 
    value: initValue, 
    name, 
    onChange, 
    type="text", 
    ...attributes 
  } = props

  const [ focus, setFocus ] = React.useState(false)
  const [ tauched, setTauched ] = React.useState(initTauched ? true : false)
  const [ value, setValue ] = React.useState(initValue ? initValue : "")
  const [ error, setError ] = React.useState(initError ? initError : false)
  const [ lastErrorMessage, setLastErrorMessage ] = React.useState('')


  const errorMessageRef = React.useRef(null)

  React.useEffect(()=>{
    setValue(initValue)
    setError(setError)
    setTauched(initTauched)
  }, [initValue, setError, initTauched])

  function handleFocus(e){
    setFocus(true)
    setTauched(true)
  }
  function handleBlur(e){
    setFocus(false)
  }

  function handleChange(e){
    if(e.target.value == " "){
      setError("Not Acceptable")
      setValue(e.target.value)
    }else{
      setValue(e.target.value)
      setError(null)
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
    <div className="ooooo">
      <div className="input_wrapper">

      <label htmlFor={name}
      className={[
        "input_label", 
        focus ? "input_label--active" : "",
        !value && tauched && !focus ? "input_label--active" : "",
        error ? "input_label--error input_label--active" : "",

        !tauched && value && !focus ? "input_label--active" : "",
        tauched && !value && !focus ? "input_label--inactive" : "",
        tauched && value && !focus ? "input_label--active" : ""
      ].join(" ")}
      >
        <span>{label} </span>
        <div ref={errorMessageRef} className={
          ["error-message.svg", error ? "error-message.svg--show" : "error-message.svg--hidden"].join(" ")}>
        {error || lastErrorMessage}
      </div>
      </label>

     
      
      <div className="input">
        <input 
        type={type}
        name={name}
        value={value} 
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        />
      </div>

      <span 
        className={[
          "input_border", 
          focus ? "input_border--active" : "",
          focus && error ? "input_border--error" : "",
          !error && tauched && !focus ? "input_border--inactive" : "",
          error && tauched && !focus ? "input_border--active input_border--error" : ""
        ].join(" ")}
      />

    </div>
    </div>
  )
}

export default Input2
