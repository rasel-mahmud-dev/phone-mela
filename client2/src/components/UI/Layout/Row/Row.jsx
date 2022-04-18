import React from 'react'
import "./Row.scss"

import withWidth from "../withWidth/withWidth";
import Col from '../Col/Col'
import styles from 'components/UI/shared/styles'

const Row = (props) => {

  const { spacing, className, justify, alignItems, style, bg, color, m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, py, px, waves, children, ...attributes} = props

  const classes = ['row',
    className,
    justify ? `justify-content-${justify}` : '',
    spacing ?  `justify-content-space-between` : '',
    alignItems ? `align-items-${alignItems}` : '',
  ].join(" ").trim()

  const jsStyles = styles(style, bg, color, m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, py, px);

  let isCol = true;
  if(children && Array.isArray(children) && children.length > 0){
    children.map(i=> isCol = isCol && i.type.name === "Col") 
  } else {
    isCol = false
  }

  const width = {
    col: {
      minWidth: 0,
      breakPoint: {
        _1:{ flex: '8.333333', maxWidth: 8.333333 },
        _2:{ flex: '16.666667', maxWidth: 16.666667 },
        _3:{ flex: '25', maxWidth: 25 },
        _4:{ flex: '33.333333', maxWidth: 33.333333 },
        _5:{ flex: '41.666667', maxWidth: 41.666667 },
        _6:{ flex: '50;', maxWidth:  50 },
        _7:{ flex: '58.333333', maxWidth: 58.333333 },
        _8:{ flex: '66.666667', maxWidth: 66.666667 },
        _9:{ flex: '75', maxWidth: 75 },
        _10:{ flex: '83.333333', maxWidth: 83.333333 },
        _11:{ flex: '91.666667', maxWidth: 91.666667 },
        _12:{ flex: '100', maxWidth: 100},
      },
    },
    sm: { minWidth: 576 },
    md: { minWidth: 768 },
    lg: { minWidth: 992 },
    xl: { minWidth: 1200 },
  }
  function spacingCalculation(spacing, maxWidth){
    let styles = {}

      if(spacing === 1){
        //  styles.margin = `0 0 4px 4px`;  
        styles.maxWidth = `calc(${maxWidth}% -  4px)`
      }
      if(spacing === 2){
        //  styles.margin = `0 0 8px 8px`;  
        styles.maxWidth = `calc(${maxWidth}% - 8px)`
      }
      if(spacing === 3){
        //  styles.margin = `0 0 0px 0px`;  
        styles.maxWidth = `calc(${maxWidth}% - 12px)`
      }
      if(spacing === 4){
        //  styles.margin = `0 0 16px 16px`;  
        styles.maxWidth = `calc(${maxWidth}% - 16px)`
      }
      if(spacing === 5){
        //  styles.margin = `0 0 20px 20px`;  
        styles.maxWidth = `calc(${maxWidth}% - 20px)`         
      }
      if(spacing === 6){
        //  styles.margin = `0 0 20px 20px`;  
        styles.maxWidth = `calc(${maxWidth}% - 40px)`         
      }
    return styles
  }

  return (
    <div className={classes} style={jsStyles}>
      { isCol ? children.map((item, i)=>{
        const { className: colClassName, col, sm, md, lg, xl, style: colStyle, ...chilAttributes } =  item.props
        let colStyles = {}  
        for(const key in width){
          if(props.winScreenSize === key && spacing){
            if(col || sm || md || lg || xl){

              if(col && props.innerWidth > width[key].minWidth){
                if(col !== 12){
                  for (const xsss in width['col'].breakPoint) {
                    let propertyNameMatch = "_" + col
                    if(xsss === propertyNameMatch){
                      let cssProperty = width['col'].breakPoint[propertyNameMatch]
                      colStyles = {...colStyles, ...spacingCalculation(spacing, cssProperty.maxWidth)  }                   
                    }
                  }
                } else{
                  colStyles.maxWidth = ``  
                }
              }
              if(sm && props.innerWidth > width['sm'].minWidth ){
                if(sm !== 12){
                  for (const xsss in width['col'].breakPoint) {
                    let propertyNameMatch = "_" + sm
                    if(xsss === propertyNameMatch){
                      let cssProperty = width['col'].breakPoint[propertyNameMatch]
                      colStyles = {...colStyles, ...spacingCalculation(spacing, cssProperty.maxWidth) }                      
                    }
                  }
                } else{
                  colStyles.maxWidth = ``  
                }
              }

              if(md && props.innerWidth > width['md'].minWidth ){
                // console.log("md tttttttttttt");
                if(md !== 12){
                  for (const xsss in width['col'].breakPoint) {
                    let propertyNameMatch = "_" + md
                    if(xsss === propertyNameMatch){
                      let cssProperty = width['col'].breakPoint[propertyNameMatch]
                      colStyles = {...colStyles, ...spacingCalculation(spacing, cssProperty.maxWidth) }
                    }
                  }
                } else {
                  colStyles.maxWidth = ``  
                }
              }
              if(lg && props.innerWidth > width['lg'].minWidth){
                // console.log("lg");
                if(lg !== 12){
                  for (const xsss in width['col'].breakPoint) {
                    let propertyNameMatch = "_" + lg
                    if(xsss === propertyNameMatch){
                      let cssProperty = width['col'].breakPoint[propertyNameMatch]
                      colStyles = {...colStyles, ...spacingCalculation(spacing, cssProperty.maxWidth) }
                    }
                  }
                } else{
                  colStyles.maxWidth = ''
                }
              }
              if(xl && props.innerWidth > width['xl'].minWidth ){
                if(xl !== 12){
                  for (const xsss in width['col'].breakPoint) {
                    let propertyNameMatch = "_" + xl
                    if(xsss === propertyNameMatch){
                      let cssProperty = width['col'].breakPoint[propertyNameMatch]
                      colStyles = {...colStyles, ...spacingCalculation(spacing, cssProperty.maxWidth) }
                    }
                  }
                } else {
                  colStyles = '' 
                }
              }
            }
          }
        }

        return (
          <Col 
            key={i} 
            className={colClassName}
            style={colStyles}
            col={col}
            sm={sm}
            md={md}
            lg={lg}
            xl={xl}
            {...chilAttributes}
          >
            {item.props.children}
          </Col> 
        )
      }) :  <React.Fragment> {children} </React.Fragment>
    }
              
    </div>
  )
}

Row.defaultProps={
  classnName: '',
  justify: '',
  alignItems: ''
}

export default withWidth(Row)
