import React from 'react'

import './MyRichText.scss';


// const Toolbar = (props)=>{
//   const { taggg } = props


//   const [fontSize, setFontSize] = React.useState(16)
//   const [forgroundColor, setForgroundColor] = React.useState('#13beff')
//   const [tag, setTag] = React.useState('div')
//   const [bold, setBold] = React.useState(false)
//   const [underline, setUnerline] = React.useState(false)
//   const [italic, setItalic] = React.useState(false)
//   const [options, setOption] = React.useState([
//     {value: 'div', label: 'Normal'},
//     {value: 'p', label: 'Para'},
//     {value: 'h1', label: 'H1'},
//     {value: 'h2', label: 'H2'},
//     {value: 'h3', label: 'H3'},
//     {value: 'h4', label: 'H4'},
//     {value: 'h5', label: 'H5'},
//     {value: 'h6', label: 'H6'}
//   ])

//   React.useEffect(()=>{
//     // setFontSize(toolbar.fontSize)
//     // setTag(taggg)
//     console.log('SDFFFFFFF');
//     // setForgroundColor(toolbar.forgroundColor)
//     // setBold(toolbar.bold)
//     // setUnerline(toolbar.underline)
//     // setItalic(setItalic.italic)
//   }, [])

  
//   // const [isShowColorPanel, setShowColorPanel ] = React.useState(false)

//   function openColorPanel(e){
//     // setShowColorPanel(true)
//     let input = e.target.parentElement.querySelector(".forgroundColor");
//     input.click()
//   }
  
//   React.useEffect(()=>{
//     props.getValue({fontSize, forgroundColor, tag, bold, underline, italic})
//     props.setTagg(setTag)
//   }, [fontSize, forgroundColor, tag, bold, underline, italic ])

//   return (
//     <ul className="m_toolbar">
//       <li className="toolbarItem" onClick={()=> setBold(!bold) }>
//           <i style={{color : bold ? '#12fb4f': ''}} className="fas fa-bold "></i>
//       </li>

//       <li className="toolbarItem"  onClick={()=> setUnerline(!underline) }>
//           <i  style={{color : underline ? '#12fb4f': ''}} className="t far fa-underline"></i>
//       </li>

//       <li className="toolbarItem"  onClick={()=> setItalic(!italic) }>
//           <i  style={{color : italic ? '#12fb4f': ''}} className="t fa fa-italic"></i>
//       </li>

//       <li className="toolbarItem">
//         <select onChange={(e)=>setTag(e.target.value)}>
//           { options.map(option=> 
//             <option key={option.value} value={option.value}>{option.label}</option> 
//           )}
//         </select>
//       </li>
//       <li className="toolbarItem">
//         <input 
//           className="fontSize" 
//           type="number" 
//           value={fontSize} 
//           name="fontSize"
//           onChange={(e)=> setFontSize(e.target.value)}
//           />
//       </li>
//       <li className="toolbarItem">
//         <span style={{color: forgroundColor}} onClick={openColorPanel} className="text_color">A</span>
//         <input 
//           className="forgroundColor" 
//           type="color" 
//           onChange={(e)=> setForgroundColor(e.target.value)}
//           />
//       </li>
//       <li className="toolbarItem">
//           <i className="t far fa-align-left"></i>
//       </li>
//       <li className="toolbarItem">
//           <i className="t far fa-align-center"></i>
//       </li>
//       <li className="toolbarItem">
//           <i className="t far fa-align-right"></i>
//       </li>
//       <li className="toolbarItem">
//           <i className="t far fa-align-justify"></i>
//       </li>
//     </ul>
//   )
// }

// Raw State

// {
//   "blocks": [
//     {
//       "key": "5i92c",
//       "text": "Hello",
//       "type": "unstyled",
//       "depth": 0,
//       "inlineStyleRanges": [
//         {
//           "offset": 2,
//           "length": 2,
//           "style": "BOLD"
//         },
//         {
//           "offset": 4,
//           "length": 1,
//           "style": "ITALIC"
//         }
//       ],
//       "entityRanges": [],
//       "data": {}
//     }
//   ],
//   "entityMap": {}
// }


import Select from 'components/Form/Select/Select'



class MyRichText extends React.Component{

  editableRef = React.createRef()

  state = {
    notEmpty: false,
    g: '',
    html: ``,
    plainText: "",

    isEditable: false,
    selected: {
      text: '',
      isSelected: false,
      startIndex: 0,
      endIndex: 0
    },
    toolbar: {
      bold: false,
      fontSize: 16,
      forgroundColor: "#13beff",
      italic: false,
      currentTag: { value: 'p', label: "Para" },
      underline: false,
      options: [
        {value: 'div', label: 'Normal'},
        {value: 'p', label: 'Para'},
        {value: 'h1', label: 'H1'},
        {value: 'h2', label: 'H2'},
        {value: 'h3', label: 'H3'},
        {value: 'h4', label: 'H4'},
        {value: 'h5', label: 'H5'},
        {value: 'h6', label: 'H6'}
      ]
    },
    blockKey: '',
    currentText: '',
    currentTag: '',
    blocks: [
      {
        Tag: 'h1',
        key: "aaa",
        text: "",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: { },
        entityRanges: [],
        data: {},
        nested: [
          {
          Tag: 'span',
          key: "aaa--1",
          text: "This is H1 Tag",
          inlineStyleRanges: { },
        }
      ]
      },
      {
        Tag: 'p',
        key: "bbb",
        text: "P Depth",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: { color: "green"},
        entityRanges: [],
        data: {},
        nested: []
      },
      {
        Tag: 'h2',
        key: "ccc",
        text: "Th",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: { color: "red"},
        entityRanges: [],
        data: {},
        nested: [
          {
            Tag: 'span',
            key: "ccc--0",
            text: "i",
            inlineStyleRanges: {color:"blue"},
          },
          {
            Tag: 'span',
            key: "ccc--1",
            text: "s",
            inlineStyleRanges: {},
          }
        ]
      },
      {
        Tag: 'h2',
        key: "eee",
        type: "unstyled",
        depth: 0,
        inlineStyleRanges: { color: "blue"},
        entityRanges: [],
        data: {},
        nested: [
          {
            Tag: 'span',
            key: "eee--0",
            text: "Th",
            inlineStyleRanges: {color:"blue"},
          },
          {
            Tag: 'span',
            key: "eee--1",
            text: "i",
            inlineStyleRanges: {color:"blue"},
          },
          {
            Tag: 'span',
            key: "eee--2",
            text: "smng",
            inlineStyleRanges: {},
          }
        ]
      }
    ]
  }

  editContent = (e)=>{
    this.setState({isEditable: true })
  }

  handleChange=(e)=>{
    const { isEditable, currentTag, currentText, html, toolbar } = this.state
    
    let content = e.target.querySelector("p").textContent


    this.setState({ currentText: content })
    if(content === ''){
      this.setState({notEmpty: true})
    }else{
      this.setState({notEmpty: false})

    }
  }


  renderHtml=()=>{
    const { currentText, ele, g, toolbar, html } = this.state    
    if(toolbar.tag === 'p'){
      return <p>{currentText}</p>
    }
  }

  handleKeyup=(e)=>{
    const { currentText, ele, g, toolbar, html } = this.state
  //   this.setState({
  //     currentText:  e.target.textContent, 
  //  }) 
  }
  
  selection = (e)=>{
 
    let {node, element, selection} = this.allSelection(e)


      this.setState({ 
          selected: { 
            text: selection,
            node: node,
            element: element
        } 
      })
    




  }
  allSelection(e){
    var selection = "";
    let node;
    let element;

    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
       
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
                container.appendChild(sel.getRangeAt(i).cloneContents());
               let childNodes = sel.getRangeAt(i).commonAncestorContainer.childNodes;
              //  console.log(sel.getRangeAt(i).commonAncestorContainer.childNodes,  e.target);
               if(childNodes.length > 0){
                 node = childNodes
               } else{
                  selection = e.target.textContent;
                  element = e.target;
               }
            }

            selection = container.outerText;
            // console.log(container);
            // html = container.innerHTML;
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
          // selection = document.selection.createRange().htmlText;
          // console.log(selection, "Fffff");
        }
    }
    // console.log(node, element, selection);

    return {node, element, selection}
  }

  handleToolbarValue=(e)=>{
    this.setState({toolbar: e})
  }

  handleTagNames(toolbar, findBlock){
    // console.log(toolbar, findBlock);

    let newCurrentBlock = {};

    toolbar.options && toolbar.options.forEach(opt=>{
      if(findBlock.Tag){
        if(opt.value == findBlock.Tag){
          newCurrentBlock.value = opt.value
          newCurrentBlock.label = opt.label
        }
      }
    })
  
    return newCurrentBlock
  }


  handleSelectBlock=(blockKey)=>{
    const { isEditable,  blocks, currentText, html, toolbar } = this.state

    let findBlock = blocks.filter(block=> block.key === blockKey )

    let h = findBlock[0]
    let isBold = false;
    for(let key in h.inlineStyleRanges ){
      if(key === "fontWeight"){
        isBold = true
      }
    }

    h.nested && h.nested.forEach(b=>{
      if(b.inlineStyleRanges){
        for(let key in b.inlineStyleRanges ){
          if(key === "fontWeight"){
            isBold = true
          }
        }
      }
    })

    
    this.setState({
      toolbar: {...toolbar, 
        currentTag: this.handleTagNames(toolbar, findBlock[0]),
        forgroundColor: findBlock[0].inlineStyleRanges.color,
        bold: isBold
      },
      blockKey: blockKey
    })
  }

  openColorPanel=(e)=>{
    let input = e.target.parentElement.querySelector(".forgroundColor");
    input.click()
  }

  handleInputSelect=(e)=>{
    const { toolbar, blockKey, blocks } = this.state
    let find = toolbar.options.filter(opt=>opt.value === e.target.value)
    this.setState({ toolbar: { ...toolbar, currentTag: find[0] } })
    if(blockKey){
      console.log("also change Tag");
      let findBlockIndex = blocks.findIndex(block=>block.key === blockKey)
      blocks[findBlockIndex].Tag =  find[0].value
      this.setState({ blocks })
    }
  }

  changeForgroundColor=(e)=>{
    const { toolbar, blockKey, selected, blocks } = this.state
    this.setState({ toolbar: { ...toolbar, forgroundColor: e.target.value}})

    if(blockKey){
      let findBlockIndex = blocks.findIndex(block=> block.key === blockKey)
      let style = {...blocks[findBlockIndex].inlineStyleRanges}
      style.color = e.target.value
      blocks[findBlockIndex].inlineStyleRanges = style
      this.setState({ blocks })
    }
  }

  changeFontSize=(e)=>{

  }

  getPropertyValue(property,  obj){
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if(key === 'inlineStyleRanges'){
          let styles = obj[key]
          if(styles[property]){
            return styles[property] 
          } else{
            return false
          }
        } 
      }
    }
  }

  makeBoldText=(e)=>{
    const {  blockKey, selected, blocks, toolbar } = this.state
    this.setState({ toolbar: { ...toolbar, bold: !toolbar.bold }})

    const { element, node, text } = selected

    let { block, index } = this.getBlock(blockKey)

    if(element && !node){

      console.log("same  line");

      let key = element.dataset.text;

      let spans = [];
      let otherBlockSpansKeys = []
      let otherBlock = []
      let lastKeyNumber;
      let noKeyUpdate = false;

      // for replace children span id increase
      let nestedChildId;

      const { baseKey, keyId } = this.indexNumber(key);

      if(keyId || keyId === 0){  // means it consist on span.......
        console.log("nested span edit.....");
      //? has nested span of block.............
        block.nested && block.nested.forEach(b=>{       
          if(b.key === key){
            // console.log(b.text);
            let matchIndex = b.text.indexOf(text)
            let start = b.text.slice(0, matchIndex);
            let end = b.text.slice(matchIndex+text.length);

            // console.log(matchIndex, start, text, end);
          
            if(start){
              console.log("Has prev Value");
              spans.push(
                {
                Tag: 'span',
                text : start,
                key: key
              },
              {
                Tag: 'span',
                text: text,
                key: baseKey + (Number(keyId) + 1),
                inlineStyleRanges: { fontWeight: this.getPropertyValue("fontWeight", b) === "bold" ? "" : "bold"},
              })
              noKeyUpdate = false
              // lastStartIndex = (Number(keyId) + 1)
            }

            if(end){
              if(!start){
                spans.push({
                  Tag: 'span',
                  text: text,
                  key: baseKey + (Number(keyId)),
                  inlineStyleRanges: { fontWeight: this.getPropertyValue("fontWeight", b) === "bold" ? "" : "bold"},
                })
              }
              console.log("has after value");
              spans.push({
                Tag: 'span',
                text: end,
                key: baseKey + (Number(keyId) + 1)
              })
              noKeyUpdate = false
              // console.log( spans);
              // lastStartIndex = Number(keyId) + 1
            }
                  
            if(!start && !end){
              console.log("Only one span create");
              spans.push({
                Tag: 'span',
                text: text,
                key: baseKey + keyId,
                inlineStyleRanges: { fontWeight: this.getPropertyValue("fontWeight", b) === "bold" ? "" : "bold"},
              }) 
              noKeyUpdate = true
            }   

            let lastKey = spans[spans.length - 1].key;
            lastKeyNumber = this.indexNumber(lastKey).keyId

            //? find same block other span to increase key id

          } else{
            otherBlockSpansKeys.push(b.key)
            otherBlock.push(b)
            // console.log(b.key);
          }
        });
      }

      else {
        //? When has Depth-0 some text............ 
        console.log("When has Depth-0 some text");
        // 1. block tag split and make span his children 
        // 2. Change his children keyId value increase by 1

        // console.log(baseKey, element, text);
        
        //? Match all text from block
        let matchIndex = block.text.indexOf(text)

        let start = block.text.slice(0, matchIndex);
        let end = block.text.slice(matchIndex+text.length);

        // console.log(matchIndex, start, text, end);
      
        if(start){
          console.log("Has prev Value");
          spans.push({
            Tag: 'span',
            text : start,
            key: `${baseKey}--0`
          },
          {
            Tag: 'span',
            text: text,
            key: `${baseKey}--1`,
            inlineStyleRanges: { fontWeight: this.getPropertyValue("fontWeight", block) === "bold" ? "" : "bold"},
          
          })
        }

        if(end){
          if(!start){
            spans.push({
              Tag: 'span',
              text: text,
              key: `${baseKey}--0`,
              inlineStyleRanges: { fontWeight: this.getPropertyValue("fontWeight", block) === "bold" ? "" : "bold"},
            })
          }
          console.log("has after value");
          spans.push({
            Tag: 'span',
            text: end,
            key: `${baseKey}--1`,
          })
          // lastStartIndex = Number(keyId) + 1
        }
                
        let n = this.indexNumber(key)
        if(!start && !end && !n.keyId){
          console.log("Only one span create depth 0");
          spans.push({
            Tag: 'span',
            text: text,
            key: `${baseKey}--0`,
            inlineStyleRanges: { fontWeight: this.getPropertyValue("fontWeight",  block) === "bold" ? "" : "bold"},
          })
        }
        block.text = ''
        nestedChildId = spans.length 
      }

      //? remove old span which block element, & from you create new span 
      let BfindIndex = block.nested && block.nested.findIndex(b=>b.key=== key) 
      if(BfindIndex !== -1){
        block.nested && block.nested.splice(BfindIndex, 1)
      }


      //? if there are only one oposite current selected block of span  
      if(otherBlockSpansKeys.length === 1){
        // console.log(otherBlockSpansKeys[0]);
        let gIndex =  block.nested.findIndex(b=> b.key ==otherBlockSpansKeys[0])
        // console.log(block.nested[gIndex]);
        
         if(this.indexNumber(block.nested[gIndex].key).keyId < lastKeyNumber ){
          console.log("No Need Change Key Index");
        }
        else{
          console.log("Need Change Key Index");
          block.nested[gIndex].key = baseKey  + ( Number(lastKeyNumber) + 1)
        }

      } else{

        if(!noKeyUpdate){
          //? array of other oposite span that you need change key_ID
          otherBlock.forEach(ob=>{
            let h = this.indexNumber(ob.key)
            let click_span_Key = this.indexNumber(key)
            
            if(click_span_Key.keyId < h.keyId ){
              ob.key = h.baseKey + (Number(h.keyId) + 1)
            }

          });

          //? when depth-0 
          block.nested.forEach(b=>{
            let m = this.indexNumber(b.key)
            b.key = `${m.baseKey}${m.keyId + Number(nestedChildId) }`
          })
        }

      }

      block.nested = [...block.nested, ...spans]
      this.filterByKey(block.nested)

    } 
    
    else if(!element && node && node.length > 0 && !element){
      console.log("sibling nested div merge spans....");
      
      const { baseKey, keyId } = this.indexNumber(block.key)

      let spans = []

      let parentText;
      let parentTextId;
      let ids = []
      node.forEach(n=>{
        if(n.nodeName === "#text"){
          parentText = n.data;
          parentTextId = n.parentElement.dataset.text
        }
        else{
          if(n.dataset){
            ids.push(n.dataset.text);
          }
        }
      })

      //? means also has text node that comes from depth-0;
      if(parentTextId && parentText){
        // 1. frist make merge all span to single span
        // 2. parent span which root ele that destroy and make span with his value.
        // 3. parent destroy (span) key_ID always 0 and, other span keyID increment + 1  

        let deletedIds = []
        let createOneSpan = false;
        let collectedText = ''
        block.nested && block.nested.map(b=>{
          collectedText += b.text
          deletedIds.push(b.key)
        });
        
        if(collectedText === text){
          spans.push({
            Tag: 'span',
            key: `${parentTextId}--0`,
            text: parentText ,
            inlineStyleRanges: {color: "orange"},
          },{
            Tag: 'span',
            key: `${parentTextId}--1`,
            text: collectedText,
            inlineStyleRanges: {color: "pink"},
          })
          
        } else{
          collectedText = parentText + collectedText  
          // 1. create only one span 
          if(collectedText === text ){
            spans.push({
              Tag: 'span',
              key: `${parentTextId}--0`,
              text: collectedText ,
              inlineStyleRanges: {},
            })
            createOneSpan = true
          }
        }

      } else{
        console.log("all span");
        // console.log(node, ids, text);
        let allTextForSpan = ''
        let otherSpan = []
        let match = []
        let collText = '';
        let fristT = '';
    
        block.nested.forEach(b=>{
          let mIndex = text.indexOf(b.text);

          if(mIndex !== -1){
            match.push({ id: b.key, text: b.text})
            fristT = b.text;
            collText+=b.text
          }
          else{
            otherSpan.push(b)
          }
        })

        let remainMatch = text.replace(collText, '')
        otherSpan.forEach(o=>{
          let i = o.text.indexOf(remainMatch)
          const start = o.text.slice(0, i);
          const end = o.text.slice(i, o.text.length);

          console.log(start, end, collText);
        })

        // console.log(allTextForSpan, otherSpan);

      }
      

      //? Match All world different inside span........
      let allText = '';
      block.nested.forEach(b=>{
        allText += b.text
      })
      if(allText === text){
        spans.push({
          Tag: 'span',
          key: `${baseKey}--0`,
          text: allText ,
          inlineStyleRanges: { fontWeight: this.getPropertyValue("fontWeight",  block) === "bold" ? "" : "bold"},
        })
      }

      block.text = ''
      blocks[index].nested = [...spans]
      console.log(spans);
      this.setState({ blocks })

    }
    
  }

  getBlock=(key)=>{
    const { blocks } = this.state
    let findIndex = blocks.findIndex(block=> block.key === key )
    if(findIndex !== -1){
      return { block: blocks[findIndex], index: findIndex  }
    }else {
      return false
    }
  }

  indexNumber=(key)=>{
    let index = key.search(/[--]/g);
    let keyId = key.slice(index+2)

    let baseKey = key.slice(0, index + 2) 
    let zero = keyId == 0 ? true : false

    let isHasKey = !!Number(keyId);
    if(!isHasKey && !zero){
      keyId = false,
      baseKey = key
    } else{
      keyId = Number(keyId)
    }

    return {
      keyId, baseKey,
    }
  }


  filterByKey=(arr)=>{
    arr && arr.sort((a, b)=>{
      // console.log(a.key, b.key);
      let aKey = Number(this.indexNumber(a.key).keyId) 
      let bKey =  Number(this.indexNumber(b.key).keyId)
      if(aKey > bKey) return 1
      if(aKey < bKey) return -1
      return 0
    })
  }

  render(){
    const { isEditable, selected, notEmpty, blocks, blockKey,  currentText, html, toolbar } = this.state

    // console.log(selected, blockKey);
  
    // if(blockKey){
    //   let { block, index} = this.getBlock(blockKey)
    //   // console.log(blocks);

    //   //? Filter By Their Index Numbers
    


    //   const updatedBlocks = blocks[index] = block
    // }
    return (
      <div className="editor_wrapper">
        
        <ul className="m_toolbar">
          <li className="toolbarItem" onClick={this.makeBoldText}>
              <i style={{color : toolbar.bold ? '#12fb4f': ''}} className="fas fa-bold "></i>
          </li>

          <li className="toolbarItem"   onClick={()=> this.setState({ toolbar: { ...toolbar, underline: !toolbar.underline }})}>
              <i  style={{color : toolbar.underline ? '#12fb4f': ''}} className="t far fa-underline"></i>
          </li>

          <li className="toolbarItem"  onClick={()=> this.setState({ toolbar: { ...toolbar, italic: !toolbar.italic }})}>
              <i  style={{color : toolbar.italic ? '#12fb4f': ''}} className="t fa fa-italic"></i>
          </li>

          <li className="toolbarItem">
            <Select onChange={this.handleInputSelect} options={toolbar.options} value={toolbar.currentTag.value} />
          </li>
          <li className="toolbarItem">
            <input 
              className="fontSize" 
              type="number" 
              value={toolbar.fontSize} 
              name="fontSize"
              onChange={(e)=> this.setState({ toolbar: { ...toolbar, fontSize: e.target.value}})}
              />
          </li>
          <li className="toolbarItem">
            <span style={{color: toolbar.forgroundColor}} onClick={this.openColorPanel} className="text_color">A</span>
            <input 
              className="forgroundColor" 
              type="color" 
              onChange={this.changeForgroundColor}
              />
          </li>
          <li className="toolbarItem">
              <i className="t far fa-align-left"></i>
          </li>
          <li className="toolbarItem">
              <i className="t far fa-align-center"></i>
          </li>
          <li className="toolbarItem">
              <i className="t far fa-align-right"></i>
          </li>
          <li className="toolbarItem">
              <i className="t far fa-align-justify"></i>
          </li>
        </ul>
      
        <div className="raw_editor_wrapper">
        <div 
          spellCheck="false"
          ref={this.editableRef}
          className="m_editor"
          // onClick={this.editContent} 
          contentEditable={true}
          onMouseUp={this.selection}   
          onInput={this.handleChange}
          onKeyUp={this.handleKeyup} 
          >

          <div  className="content" data-contents="true">
            { blocks.map(b=> (
              <b.Tag onClick={()=>this.handleSelectBlock(b.key)} data-block="true" data-offset-key={b.key}>
                    <span style={b.inlineStyleRanges} key={b.key} data-text={b.key}>
                      { b.text }
                      { b.nested && b.nested.map(nestedEl=>(
                        <nestedEl.Tag style={nestedEl.inlineStyleRanges} data-text={nestedEl.key}>
                          {nestedEl.text}
                        </nestedEl.Tag>
                      )) }
                    </span>                  
              </b.Tag>
              )
            )}
          </div>
      </div>
      </div>
      </div>
    )
  }
}

export default MyRichText