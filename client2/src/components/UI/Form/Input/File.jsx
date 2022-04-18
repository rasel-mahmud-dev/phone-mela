import React from 'react'
import "./File.scss"

import Checkbox from "UI/Form/Checkbox/Checkbox";
import fullLink from "src/utils/fullLink";

const File = (props) => {

  const [ fileValue, setFileValue ] = React.useState({name: "", data: ""})
  const [ originalRes, setOriginalRes ] = React.useState(false)

 const { size="md",
  theme,
  placeholder,
  label,
  passwordEye,
  value,
  name,
  type,
  onChange,
  onBlur,
  onClick,
  error,
  tauched,
  className } = props

  // function fileToBase64(file){
  //   return new Promise((resolve, reject)=>{
  //     let reader = new FileReader()
  //     reader.onload = function(e){
  //       let dataUrl = e.target.result
  //       resolve(dataUrl)
  //     }
  //     reader.readAsDataURL(file)
  //   })
  // }
  
  React.useEffect(()=>{
    setOriginalRes(!!value)
  }, [value])

  const image = React.createRef()
  const imageInput = React.createRef()

  function fileToBase64(file, callback){
    let reader = new FileReader()
    reader.onload = function(e){
      let dataUrl = e.target.result
      callback(dataUrl)
    }
    reader.readAsDataURL(file)   
  }

  function handleChange(e){
    const { name, type } = e.target
    if(e.target.files.length > 0){
      let file = e.target.files[0];
      fileToBase64(file, (data)=>{
        setFileValue({ name: file.name, data })
          onChange && onChange({target: {
            name, 
            type,
            file: file,
            value: { fileName: file.name, dataUrl: data, image: image.current ? image.current : null  },
          }})
      })
    }
  }
  function handleCheckbox(e){
    setOriginalRes(e.target.checked)
  }

  function chooseFile(){
    imageInput.current.click()
  }

  return (
    <div>
      <input hidden
        name={name}
        onChange={handleChange} 
        type={type}
        ref={imageInput}
      />
      <div onClick={chooseFile} className="input_choose_btn"><span>Select File</span></div>
      <div className="checkbox">
        <label htmlFor="">orgianal Photo size</label>
        <Checkbox value={originalRes} onChange={handleCheckbox} type="checkbox"  id=""/>

      </div>
      <div className="image-preview">
        <img
            ref={image}
            style={{ width: originalRes ? "" : "100%" }}
            src={ fileValue.data ? fileValue.data : fullLink(value) }
            alt={fileValue.name} />
      </div>
    </div>
  )
}

export default File
