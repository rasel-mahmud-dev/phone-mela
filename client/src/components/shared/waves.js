import "./waves.scss"

function isWindow(document) {
  return document !== null && document === document.window; //? false
}

function getWindow(document) {
  return isWindow(document) ? document : document.nodeType === 9 && document.defaultView; // return window
}

function offset(elem) {
  let html;
  let win;
  let box = { top: 0, left: 0 };

  let document = elem && elem.ownerDocument;
  html = document.documentElement;
  if (typeof elem.getBoundingClientRect !== typeof undefined) {
    box = elem.getBoundingClientRect();
  }
  win = getWindow(document);
  return {
    top: box.top + win.pageYOffset - html.clientTop,
    left: box.left + win.pageXOffset - html.clientLeft
  };
}


export default function(e, waves){
  if (e.button === 2) return false
  const parent = e.target
  parent.classList.add('ripple_parent')

  const width = parent.offsetWidth;
  const height = parent.offsetHeight;
  const rippleWidth = width > height ? width : height; 

  const centerilize = rippleWidth / 2   

  let pos = offset(e.target)
  const left = ( e.pageX - pos.left) - centerilize;
  const top = ( e.pageY - pos.top) - centerilize;

  let ripple = document.createElement("div")
  ripple.classList.add("ripple")
  ripple.style.top = `${top}px`
  ripple.style.left = `${left}px`
  ripple.style.width = `${rippleWidth}px`
  ripple.style.height = `${rippleWidth}px`


  if(waves){
    let types = ["#", "rgba", "rgb", "hsl"]
    if(typeof(waves) === 'string'){
      types.forEach(type=>{
        if(waves.indexOf(type) !== -1){
          ripple.style.background = waves
        }
      })

      ripple.classList.add(`waves_${waves}`)
    }
  }

  parent.appendChild(ripple)
  setTimeout(() => {
    parent.removeChild(ripple)
  }, 700);
  
}
