import React from 'react';

import "./Category.scss"


let isDown = false
let initialPos = false;
let direction = "";

let targetItem = null
let targetPrev = null

let lastMoveWidth = false

const Category = (props) => {
  
  React.useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove, false)
    document.addEventListener("mouseup", handleMouseUp, false)
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [0])
  
  const thead = React.createRef()
  
  
  function handleMouseMove(e) {
    if (isDown) {
      
      
      direction = "forward"
      
      if (lastMoveWidth > e.pageX) {
        console.log("reduce")
        targetPrev.style.flex = targetPrev.offsetWidth - 5 + "  " + 0 + " auto"
        targetPrev.style.width = targetPrev.offsetWidth - 5 + "px"
        targetPrev.style.maxWidth = targetPrev.offsetWidth - 5 + "px"
        
        if (thead.current) {
          thead.current.style.maxWidth = thead.current.offsetWidth - 5 + "px"
        }
        
      } else {
        console.log("increase")
        targetPrev.style.flex = targetPrev.offsetWidth + 5 + "  " + 0 + " auto"
        targetPrev.style.width = targetPrev.offsetWidth + 5 + "px"
        targetPrev.style.maxWidth = targetPrev.offsetWidth + 5 + "px"
        
        if (thead.current) {
          thead.current.style.maxWidth = thead.current.offsetWidth + 5 + "px"
        }
      }
      lastMoveWidth = e.pageX
    }
  }
  
  function handleMouseDown(e) {
    isDown = true
    initialPos = e.pageX
    targetItem = e.target.offsetParent
    targetPrev = targetItem.previousSibling
  }
  
  
  function handleMouseUp() {
    isDown = false
    initialPos = false
    targetItem = null
    targetPrev = null
  }
  
  function Thead() {
    const data = ["name", "image", "status", "action"]
    
    return (
      <div ref={thead} className="thead">
        {data.map(item => (
          <li className="table-header-item">
            {item[0].toUpperCase() + item.slice(1)}
            <div
              onMouseMove={handleMouseMove}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              className="resize"></div>
          </li>
        ))}
      </div>
    
    )
  }
  
  function TBody() {
    const tbody = [
      {name: "Mobile", image: "", status: "Available", action: "Edit"},
      {name: "Rice Cooker", image: "", status: "Available", action: "Edit"},
      {name: "Box", image: "", status: "Available", action: "Edit"},
      {name: "Headphone", image: "", status: "Available", action: "Edit"},
      {name: "Book", image: "", status: "Available", action: "Edit"},
      {name: "Watch", image: "", status: "Available", action: "Edit"},
      {name: "Desktop", image: "", status: "Available", action: "Edit"},
      {name: "Cloths", image: "", status: "Available", action: "Edit"},
    ]
    
    return (
      <tbody>
      {tbody.map(item => (
        <tr>
          <td>{item.name}</td>
          <td>{item.image}</td>
          <td>{item.status}</td>
          <td>{item.action}</td>
        </tr>
      ))}
      </tbody>
    
    )
    
  }
  
  
  return (
    <div className="product_category card">
      <div className="card-header">
        <h2 className="title">Products Category</h2>
      </div>
      
      <div className="card-body">
        <div className="pull-right ">
          <button className="btn btn-primary">Add Category</button>
        </div>
        <div className="clear-fix"/>
        
        <div className="react-table">
          {Thead()}
          {TBody()}
        </div>
      
      
      </div>
    
    </div>
  );
};

export default Category;


