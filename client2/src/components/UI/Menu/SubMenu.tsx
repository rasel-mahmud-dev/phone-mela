import React, {CSSProperties, FC} from "react";
import Item from "./Item"

import Animation from "UI/Animation/Animation";

import {
  faAngleDown,
  faAngleUp,
  faCartPlus,
  faCog, faHandsHelping,
  faHeart,
  faShoppingBag,
  faSignOutAlt,
  faStar
} from "@fortawesome/pro-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

interface SubMenuProps {
  selectedKeys?: string[]
  defaultOpenKeys?: string[]
  onClick?: any
  children: any
  title: any
  id?: string
  className?: string
  style?: CSSProperties
  onMouseOver?: any
  onMouseLeave?: any
  onMouseEnter?: any
  inline?: boolean,
  parent?: JSX.Element
  key?: string
}


const SubMenu: FC<SubMenuProps> = (props)=>{
  const {
    title,
    parent,
    inline=false,
    id,
    defaultOpenKeys=[],
    selectedKeys=[]
  } = props
  
  function isExpandSubMenu(){
    return selectedKeys.indexOf(id as string) !== -1
  }
  
  function menuItem(inline: boolean){
    let res = []
   
    return (
        <>
          <div className="menu_item--left">
            {title.props.children}
        {/*    { title.props ? title.props.children &&  title.props.children.map(item=>(*/}
        {/*      item.type === "i" ? (*/}
        {/*        <i className={[item.props.className, "menu_item_icon"].join(" ")}>{item.children}</i>*/}
        {/*      ) : item*/}
        {/*  ))*/}
        {/*: "fd"}*/}
        </div>
        <div className="menu_item--right">
          <FontAwesomeIcon icon={isExpandSubMenu() ? faAngleUp : faAngleDown} />
          
          {/*<i className={[*/}
          {/*  "icon-right fa menu_item_icon",*/}
          {/*  isExpandSubMenu()*/}
          {/*    ? "fa-angle-up"*/}
          {/*    : "fa-angle-down"].join(" ")}*/}
          {/*/>*/}
          
        </div>
      </>
      )
    }
    
    function renderInline(){
      return (
        <div>
          { title.props.children && title.props.children.length > 0 && title.props.children.map((ch: any)=>{
            if(ch.type === "i"){
              return (
                <li
                  // onClick={()=>props.onClick && props.onClick(id)}
                  onMouseOver={()=>props.onMouseOver && props.onMouseOver(id)}
                  onMouseEnter={()=>props.onMouseEnter && props.onMouseEnter(id)}
                  onMouseLeave={()=> props.onMouseLeave && props.onMouseLeave(id)}
                  className="menu_item">
                  
                  {React.cloneElement(ch, {...ch.props, className: ch.props.className + " " + "menu_icon"})}
                  
                  { selectedKeys.indexOf(id as string) != -1 && <div className="sub_menu inline-mode--sub_menu ">
                    <Item
                      {...ch}
                      children={(
                        <span className="sub_menu__title" >{title.props.children && Array.isArray(title.props.children) && title.props.children[1]}</span>
                      )}
                      inline={inline}
                      key={ch.key}
                      id={ch.key}
                    />
                    {props.children && Array.isArray(props.children) ?  props.children.map((ch_ch: any)=>(
                        <Item
                          {...ch_ch.props}
                          inline={inline}
                          key={ch_ch.key}
                          id={ch_ch.key}
                        />
                      ))
                      : (
                        <Item
                          {...ch.props}
                          inline={inline}
                          key={ch.key}
                          id={ch.id}
                        />
                      )
                    }
                  </div>  }
                </li>
              )
            }
          })}
        </div>
      )
    }
  
    
    return (
        <>
          { inline
            ? renderInline()
            : (
                <li
                  key={id}
                  className={["menu_item ", props.className, isExpandSubMenu()
                    ? "menu_item--activated" : ""].join(" ")}
                  style={props.style}
                  onClick={()=>props.onClick && props.onClick(id)}
                  onMouseOver={()=>props.onMouseOver && props.onMouseOver(id)}
                  onMouseEnter={()=>props.onMouseEnter && props.onMouseEnter(id)}
                  onMouseLeave={()=>props.onMouseLeave && props.onMouseLeave(id)}
                >
                  <div className="menu_item__row">
                    {menuItem(inline)}
                  </div>
  
                  <div className={"sub_menu"}>
             
                    <Animation baseClass="sub_menu_animation" inProp={(!inline && selectedKeys.indexOf(id as string) !== -1) }>
                      {props.children && Array.isArray( props.children) ?  props.children.map((ch: any)=>(
                          <Item
                            {...ch.props}
                            key={ch.key}
                            id={ch.key}
                          />
                        ))
                        : (
                          <Item
                            {...props}
                            key={props.key}
                            id={props.id}
                          />
                        )
                      }
                    </Animation>
                  </div>
                  
                  
                </li>
              )
            }
            
            
        </>
    )
}

SubMenu.displayName = "SubMenu"
export default SubMenu

