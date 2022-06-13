// import React from 'react'
//
// import { NavLink } from 'react-router-dom'
// import Button from  "components/Button/Button"
// import Box from 'components/Box/Box'
//
// import { Container, Row, Col }  from 'components/Layout'
// import Select from 'components/Form/Select/Select'
//
// const Components = (props)=>{
//   let mmmm = "kkhk"
//
//   const [ options, setOptions ] = React.useState([
//     {value: 'p', label: 'Para'},
//     {value: 'div', label: 'Normal'},
//     {value: 'h1', label: 'H1'},
//   ])
//
//   const [ select , setSelect ] = React.useState({value: 'div', label: 'Normal'})
//
//   function handleChange(e){
//     // console.log(e.target.value);
//     let g = options.filter(opt=>opt.value === e.target.value)
//     setSelect(g[0])
//   }
//
//   return (
//     <div>
//       <NavLink exact to="/components/buttons"><Button theme="red">Button</Button></NavLink>
//       <Select onChange={handleChange} options={options} value={select.value} />
//     </div>
//   )
//
// }
//
// export default Components
//
// function c(){
//
// }
// c();
// let obj = {
//   name: "SGGGG",
//   Sd: "GF"
// }