import React from "react";
import Item from "./Item"
import SubMenu from "./SubMenu"


interface MenuProps {
  selectedKeys?: string[]
  defaultOpenKeys?: string[]
  onClick?: any
  children: any
  inline?: boolean
  style?: CSSStyleSheet
}


class Menu extends  React.Component<MenuProps, any>{
  
  static Item = Item
  static SubMenu = SubMenu
  
  renderItems = ()=>{
    
    const {selectedKeys, inline, defaultOpenKeys, onClick, children, style={},...attributes} = this.props
    if(this.props.children.length > 0){
      return this.props.children.map(ch=>{
        if(ch){
          return ch.type && ch.type.displayName === "SubMenu" ? (
            <SubMenu
              {...ch.props}
              key={ch.key}
              id={ch.key}
              inline={inline}
              selectedKeys={selectedKeys}
              defaultOpenKeys={defaultOpenKeys}
              children={ch.props.children}
            />
          ) : ch.type && ch.type.displayName === "Item" ? (
            <Item
              {...ch.props}
              key={ch.key}
              id={ch.key}
              inline={inline}
              selectedKeys={selectedKeys}
              defaultOpenKeys={defaultOpenKeys}
            />
          ) : ch
        }
      })
    } else {
      if (children) {
        if (children.type) {
          return children.type.displayName === "SubMenu"
            ? <SubMenu
              {...children.props}
              key={children.key}
              id={children.key}
              inline={inline}
              selectedKeys={selectedKeys}
              defaultOpenKeys={defaultOpenKeys}
             />
            : children.type.displayName === "Item"
              ? (
                <Item
                  {...children.props}
                  key={children.key}
                  id={children.key}
                  inline={inline}
                  selectedKeys={selectedKeys}
                  defaultOpenKeys={defaultOpenKeys}
                />
              )
              : children
        }
      }
    }
  }
  
  render(){
  
  const {style={}} = this.props
    
    return (
      <div style={style} className={["menu", this.props.inline && "menu_inline--mode"].join(" ")}>
        {this.renderItems()}
      </div>
    )
  }
}

export default Menu


