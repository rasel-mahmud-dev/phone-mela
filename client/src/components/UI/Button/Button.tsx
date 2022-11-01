import React, {FC, HTMLAttributes} from "react";


interface BaseButtonProps extends HTMLAttributes<HTMLButtonElement>{
  loading?: boolean | { delay?: number };
  prefixCls?: string;
  className?: string;
  ghost?: boolean;
  danger?: boolean;
  block?: boolean;
  children?: React.ReactNode;
}


const Button:FC<BaseButtonProps> = (props)=>{
  const {
   loading,className,
        ...attributes} = props
    
      return (
        <button
          className={`px-4 py-2 font-semibold rounded-md ${className}`}
          {...attributes}>
          { loading && <LoadingIcon /> }
          { props.children && <span className={[(loading) ? 'ml-2' : ''].join(' ')}>{props.children}</span>}
        </button>
      )
}


const LoadingIcon = () => {
  return (
    <div className="loading-circle">
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

export default Button