

export default function(...props){

  const [ style, bg, color, m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, py, px ] = props

  let marginStyles = {...style  }
  const isObjForMargin = typeof m == 'object' && Object.keys(m) && Object.keys(m).length > 0    

  if(mt !== undefined) marginStyles.marginTop = `${mt}px` 
  if(mb !== undefined) marginStyles.marginBottom = `${mb}px` 
  if(ml !== undefined) marginStyles.marginLeft = `${ml}px` 
  if(mr !== undefined) marginStyles.marginRight = `${mr}px` 

  if(m !== undefined && !isObjForMargin ) marginStyles.margin = `${m}${m ? 'px' : ''}`  

  if(m !== undefined && isObjForMargin){
    let mt = m.t, 
    mb = m.b, ml = m.l, 
    mr = m.r,
    my = m.y,
    mx = m.x

    if(mt !== undefined) marginStyles.marginTop = mt 
    if(mb !== undefined) marginStyles.marginBottom = mb 
    if(ml !== undefined) marginStyles.marginLeft = ml 
    if(mr !== undefined) marginStyles.marginRight = mr 

    if(my !== undefined) { 
      marginStyles.marginTop = my 
      marginStyles.marginBottom = my 
    } 
    if(mx !== undefined) { 
      marginStyles.marginRight = mx 
      marginStyles.marginLeft = mx 
    }       
  } 

  if(my !== undefined){
    marginStyles.marginTop = `${my}${my ? checkAuto(my) ? '' : 'px' : ''}`
    marginStyles.marginBottom = `${my}${my ? checkAuto(my) ? '' : 'px' : ''}`

  } 
  if(mx !== undefined){     
    marginStyles.marginLeft = `${mx}${mx ? checkAuto(mx) ? '' : 'px' : ''}` 
    marginStyles.marginRight = `${mx}${mx ? checkAuto(mx) ? '' : 'px' : ''}`
  }

  function checkAuto(value){
    return value === 'auto'
  }


    let paddingStyles = {}
    const isObjForPadding = typeof p == 'object' && Object.keys(p) && Object.keys(p).length > 0 

    if(pt !== undefined) paddingStyles.paddingTop = `${pt}px`
    if(pb !== undefined) paddingStyles.paddingBottom = `${pb}px`
    if(pl !== undefined) paddingStyles.paddingLeft = `${pl}px`
    if(pr !== undefined)  paddingStyles.paddingRight = `${pr}px`

    if(p !== undefined && !isObjForPadding ) paddingStyles.padding = `${p}${p ? 'px' : ''}`     
    
    if(p !== undefined && isObjForPadding){
      let pt = p.t
      let pb = p.b
      let pl = p.l
      let pr = p.r

      let py = p.y
      let px = p.x

      if(pt !== undefined) stypaddingStylesles.paddingTop = pt 
      if(pb !== undefined) paddingStyles.paddingBottom = pb 
      if(pl !== undefined) paddingStyles.paddingLeft = pl 
      if(pr !== undefined) stylpaddingStyless.paddingRight = pr 

      if(py !== undefined) { 
        paddingStyles.paddingTop = py 
        paddingStyles.paddingBottom = py 
      } 
      if(px !== undefined) { 
        paddingStyles.paddingRight = px 
        paddingStyles.paddingLeft = px 
      }       
    } 

    if(py !== undefined){
      paddingStyles.paddingTop = `${py}${py ? checkAuto(py) ? '' : 'px' : ''}`
      paddingStyles.paddingBottom = `${py}${py ? checkAuto(py) ? '' : 'px' : ''}`
    } 
    if(mx !== undefined){
      paddingStyles.paddingLeft = `${px}${px ? checkAuto(px) ? '' : 'px' : ''}`
      paddingStyles.paddingRight = `${px}${px ? checkAuto(px) ? '' : 'px' : ''}`
    }


    if(bg !== undefined){
      marginStyles.background = bg
    }
    if(color !== undefined){
      marginStyles.color = color
    }

  return {...style, ...paddingStyles, ...marginStyles}
}


