import React, { useRef, useEffect } from "react";
import classnames from "classnames";
import File from './File'

const Input = (props) => {
  let {
    size="md",
    theme,
    placeholder,
    label,
    passwordEye,
    value,
    name,
    type = "text",
    onChange,
    onBlur,
    onClick,
    error,
    tauched,
    className,
  } = props;

  const [isFocused, setFocus] = React.useState(false);
  const [isFocusedBar, setFocusedBar] = React.useState(false);
  const [isShowPass, setShowPass] = React.useState(false);
  const [renderShowPassword, setRenderShowPassword] = React.useState(false);
  const [lastErrorMessage, setLastErrorMessage] = React.useState("");

  const input = React.createRef();

  const prevErrorRef = useRef();
  React.useEffect(() => {
    if (prevErrorRef.current) {    
      setLastErrorMessage(prevErrorRef.current.innerHTML);
    }
    if(value && passwordEye){
      setRenderShowPassword(true);      
    }
  }, [error]);  

  
  function showInputHandler(e) {
    setFocus(true);
    input && input.current.focus();
  }

  const handleBlur = e => {
    setFocusedBar(false);
    onBlur && onBlur(e)
    if (input) {
      if (!input.current.value ) {
        setFocus(false);
      }
    }
  };

  const showPassword = (e)=> {
    setShowPass(!isShowPass);
  };

  let groupClasses = classnames("input_group", className, !label ? "no_label" : '', size && size, theme && `input_group_${theme}`);

  function onChang(e) {
    if(type === "password"){
      if (e.target.value && passwordEye) {
        setRenderShowPassword(true);
      } else {
        setRenderShowPassword(false);
      }
    }
    onChange && onChange({target: { name: e.target.name, value: e.target.value, type: e.target.type }});
  }
  
  function handleClick(e){
    setFocusedBar(true);
    onClick && onClick(e)
  }
    
  
  if(type === 'file'){
    return <File {...props}  />
  }

  else if(type === 'color'){
    return (
      <input
      type={type}
      name={name}
      value={value}
      onChange={onChang}
      className={className}
   />
    )
  } else{
    return (
      <div onClick={showInputHandler} className={groupClasses}>
      <label
        className={[
          placeholder && "expand_label",
          isFocused || value ? "expand_label" : "collapse_label",
          error && tauched ? "error_label" : "",
          error && !value && !isFocused ?  "collapse_error_label" : "",
          size && `label-${size}`
        ].join(" ")}
        htmlFor={name}
      >
        {label}
      </label>

      <div  className="input_wrapper">
        <div
          ref={prevErrorRef}
          className={[
            "error_message",
            error && tauched ? "show_error_message" : "hide_error_message",
            error && !value && !isFocused ?  "collapse_show_error_message" : ""
          ].join(" ")}
        >
          {error || lastErrorMessage}
        </div>
        <input
          type={type === "password" ? (isShowPass ? "text" : type) : type}
          name={name}
          placeholder={placeholder}
          ref={input}
          value={value}
          onChange={onChang}
          onBlur={handleBlur}
          onClick={handleClick}
          className={[ isFocused || value ? "expand_input" : "collapse_input"].join(" ")}
        />

        { type === "password" && renderShowPassword && (
          <div onClick={showPassword} className="show_password_icon">
            <i
              className={["far", isShowPass ? "fa-eye-slash" : "fa-eye"].join(" ")}
            />
          </div>
        )}
        <span
          className={[
            "input_border",
            isFocusedBar ? "expand_input_border" : "",
            !isFocusedBar ?  "collapse_input_border" : "",
            error ? "input_border_error" : ''
          ].join(" ")}
        />
      </div>
    </div> 
    )
  }

  
}

export default Input;
