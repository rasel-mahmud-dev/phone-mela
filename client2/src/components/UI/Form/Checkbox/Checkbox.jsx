import React from 'react'
import classnames from 'classnames'

import './Chekcbox.scss'

const Checkbox = (props) => {
  
  const { name, value, onChange } = props
  
  const [checked, setChecked] = React.useState(false)

  const handleCheckBox = (e)=>{    
    setChecked(e.target.checked)
    if(onChange){
      onChange({target: { 
        name: e.target.name, 
        checked: e.target.checked, 
        value: e.target.checked, 
        type: e.target.type 
      }})
    }
  }
  React.useEffect(()=>{
    setChecked(value)
  }, [value])
  
  const { color, icon } = props

  const classes = classnames(
    'checkbox_root',
    checked ? 'checked' : 'unchecked',
    color && checked && `checked_${color}`,
    color && !checked && `unchecked_${color}`
  )

  let iconChecked;  
  let iconUnchecked;  
    if(checked){
      if(icon){
        if(icon === 'heart'){
          iconChecked = (
            <svg className="checkbox_svg" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
          </svg>
          )
        }
      } else{
        iconChecked = <svg className="checkbox_svg" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
          <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
        </svg>
      }
    }

    if(!checked){
      if(icon){
        if(icon === 'heart'){
        iconUnchecked = <svg className="checkbox_svg" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
          <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path>
        </svg>
        
        }
      } else{
        iconUnchecked = <svg className="checkbox_svg" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
          <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
        </svg>
      }
    }

  return (
    <div className={classes}>
      <input 
        className="checkbox_input"
        type="checkbox" 
        name={name} 
        value={value}
        onChange={handleCheckBox}
        checked={checked}
      />
      { checked ? iconChecked : iconUnchecked  }
    </div>
  )
}

export default Checkbox
