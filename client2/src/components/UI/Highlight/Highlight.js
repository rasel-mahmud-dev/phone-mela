import React from 'react'

import './prism'
import './prism.css';

const Highlight = (props) => {

  const { children  } = props

  const [ codePreview, setCodePreview ] = React.useState(``)
  const innerHtml = React.createRef(null)

  React.useEffect(()=>{

    const htmlSnippet = children;

    let pre = document.createElement("pre");
    let code = document.createElement("code");
    pre.appendChild(code);

    code.className = "snippet language-jsx";
    code.innerText = htmlSnippet;

    if(innerHtml){
      innerHtml.current.appendChild(pre);      
    }

    /*
    This is required, otherwise the elements are shown in one line.
     Taken from: https://github.com/PrismJS/prism/issues/1764#issuecomment-467677558
     */
    Prism.hooks.add("before-highlight", function (env) {
      env.code = env.element.innerText;
    });
    Prism.highlightElement(code);
    
  }, [0])

  return (
    <div className="code" ref={innerHtml}></div>
  )
}

export default Highlight