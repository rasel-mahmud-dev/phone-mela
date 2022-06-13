import React from 'react'

import './MyRichText.scss';

import Select from 'components/Form/Select/Select'
import Input from 'components/Form/Input/Input'
import Checkbox from 'components/Form/Checkbox/Checkbox'
import Button from 'components/Button/Button'

import selectAllIcon from '../../asserts/icon/selectAll.svg'

import { Row, Col, Container } from 'components/Layout'

class MyRichText2 extends React.Component{

  editableRef = React.createRef()

  componentDidMount(){
    const { code } = this.state
    if(this.editableRef.current){
      this.setState({ doc: this.editableRef.current  })
      if(code){
        this.editableRef.current.innerHTML = code
        this.editableRef.current.focus();
        this.makeNotEmpty(this.editableRef.current)
      }
    }
    // if(this.props){
      
    // }
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props.state !== prevProps.state ){
      this.setState({code: this.props.state})
      this.editableRef.current.innerHTML = this.props.state
      this.editableRef.current.focus();
      this.makeNotEmpty(this.editableRef.current)
    }    
  }

  state = {
    doc: null,
    isEditable: false,
    selectText: '',
    selectedTag: null,
    code: ``,
    openCreateLinkModal: {
      isModalOpen: false,
      url: "http://",
      display: "",
      alt: "",
      openNew: true
    },
    openCreateAddImageModal: {
      isModalOpen: false,
      image: {dataUrl: '', fileName: '', extension: ''},
      imageDescription: "",
      upload: true,
      uploading: false
    },
    toolbar: {
      imageResize: false,
      previewCode: false,
      bold: false,
      fontSize: 14,
      forgroundColor: "#13beff",
      backgroundColor: "#ff0000",
      italic: false,
      currentTag: { value: 'p', label: "Para" },
      underline: false,
      strikeThrough: false,
      currentFontFamily: { value: "", label: "" },
      fontFamilyOptions: [
        { value: 'Arial', label: 'Arial'},
        { value: 'Calibri', label: 'Calibri'},
        { value: 'Cambria', label: 'Cambria'},
        { value: 'Consolas', label: 'Consolas'},
        { value: 'Heebo', label: 'Heebo'}, 
        { value: 'Oswald', label: 'Oswald'}, 
        { value: 'Poppins', label: 'Poppins'}, 
        { value: 'Noto Sans', label: 'Noto Sans'}, 
        { value: 'Fira Sans', label: 'Fira Sans'}, 
        { value: 'Fjalla One', label: 'Fjalla One'}, 
        { value: 'Lato', label: 'Lato'},
        { value: 'Montserrat', label: 'Montserrat'},
        { value: 'public sans', label: 'public sans'},
        { value: 'Roboto', label: 'Roboto'},
        { value: 'Rubik', label: 'Rubik'},
        { value: 'Segoe UI', label: 'Segoe UI'}
      ],
      options: [
        {value: 'div', label: 'Normal'},
        {value: 'p', label: 'Paragraph'},
        {value: 'h1', label: 'H1'},
        {value: 'h2', label: 'H2'},
        {value: 'h3', label: 'H3'},
        {value: 'h4', label: 'H4'},
        {value: 'h5', label: 'H5'},
        {value: 'h6', label: 'Subtitle'},
        {value: 'pre', label: 'Preformatted <pre>'}
      ]
    }
  }

  makeNotEmpty=(doc)=>{
    if(doc.innerHTML == ''){
      doc.innerHTML = " "
    }
  }

  editContent = (e)=>{
    this.setState({isEditable: true })
    this.state.doc.focus()
    this.makeNotEmpty(this.state.doc)
  }
  handleChange=()=>{
    const { doc, code, toolbar }  = this.state
    if(toolbar.previewCode){
      if(this.props.onChange){
        let p = doc.querySelector(".codePreview_Pre")
        if(p){
          this.props.onChange(p.innerText)
          this.setState({code:p.innerText })
        }else{
          this.props.onChange(code)
        }
      }
    } else{
      this.props.onChange && this.props.onChange(doc.innerHTML)
      this.setState({code: doc.innerHTML})
    } 
    this.makeNotEmpty(doc)
  }

  allSelection(){
    var selectText = "";
    let selectedTag;
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var container = document.createElement("div");
            for (var i = 0, len = sel.rangeCount; i < len; ++i) {
              container.appendChild(sel.getRangeAt(i).cloneContents());                     
            }
            selectText = container.outerText;
            selectedTag = sel.baseNode.parentNode
        }
    } else if (typeof document.selection != "undefined") {
        if (document.selection.type == "Text") {
          selectText = document.selection.createRange().htmlText;
          console.log("other selection");
        }
    }
    return {selectText, selectedTag}
  }


  selection=(e)=>{
    const { toolbar } = this.state
    const { selectedTag, selectText } = this.allSelection()

    // console.log(e.target.tagName);

    let styles = { B: "bold", U: 'underline', I: 'italic' }    
    let tags = ["B", "F", "U", "I", "DIV"]
    let generateStyle = {...toolbar}

    tags.forEach(tag=>{

      if(e.target.tagName){

        if(tag === e.target.tagName){
          generateStyle[styles[e.target.tagName]] = true
        } else{
          generateStyle[styles[tag]] = false
        }

        if(e.target.parentElement !== tag ){
          if(tag === e.target.parentElement.tagName){
            generateStyle[styles[e.target.parentElement.tagName]] = true
          }
        }
      } else{
        if(styles[tag]){
          generateStyle[styles[tag]] = false
        }
      }
    })

    this.setState({  
      selectedTag, 
      selectText,
      toolbar: {...toolbar, ...generateStyle}
     })
  }

  handleToolbarValue=(e)=>{
    this.setState({toolbar: e })
  }

  handleTagNames(toolbar, findBlock){
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

  formatDoc=(command, callback, sValue)=>{
    const { doc, currentSelectTag } = this.state
    document.execCommand(command, false, sValue)
    doc.focus();
    let tag = this.allSelection().selectedTag
    if(tag && tag.tagName){
      callback(tag.tagName)
    }else{
      callback(false)
    }
  }

  openColorPanel=(e, isBg)=>{

    const { toolbar } = this.state
      
    let input = e.target.querySelector("input")
    if(input){
      input.click()
      this.colorInputEvent = input.addEventListener("input", (e)=>{
        this.changeColor(e.target.value, isBg)
      })
    };

  }

  changeColor=(color, isBg)=>{
    const { toolbar } = this.state
    if(isBg){
      this.setState({ toolbar: {...toolbar, backgroundColor: color} })
      this.formatDoc("backcolor", ()=>{},  color)
    }else{
      this.setState({ toolbar: {...toolbar, forgroundColor: color} })
      this.formatDoc("forecolor", ()=>{},  color)
    }
  }
  makeBoldText=(e)=>{
    const { toolbar } = this.state
    this.formatDoc('bold', (tagName)=>{
      if(tagName && tagName == "B"){
        this.setState({ toolbar: { ...toolbar,  bold: true } })   
      }else{
        this.setState({ toolbar: { ...toolbar,  bold: false } })   
      }
    })    
  }
  makeUnderLine=(e)=>{
    const { toolbar } = this.state
    this.formatDoc('underline',  (tagName)=>{
      if(tagName && tagName === "U"){
        this.setState({ toolbar: { ...toolbar,  underline: true } })   
      }else{
        this.setState({ toolbar: { ...toolbar,  underline: false } })   
      }
    })
  }
  makeItalic=(e)=>{
    console.log("DSFFFFFFFFF");
    const { toolbar } = this.state
    this.formatDoc('italic',  (tagName)=>{
      if(tagName && tagName === "I"){
        this.setState({ toolbar: { ...toolbar,  italic: true } })   
      }else{
        this.setState({ toolbar: { ...toolbar,  italic: false } })   
      }
    })
  }
  changeTag=(e)=>{
    const { toolbar, } = this.state
    const {value} = e.target
    let label = toolbar.options.filter(opt=>opt.value === value)
    this.setState({ toolbar: { ...toolbar, currentTag: label[0] } })
    this.formatDoc("formatblock", ()=>{},  label[0].value)
  }
  changeFontSize=(e)=>{
    const { toolbar, selectedTag, selectText } = this.state
    this.setState({ toolbar: { ...toolbar, fontSize: e.target.value}})
    // console.log(e.target.value);
    // this.formatDoc("fontsize", ()=>{},  e.target.value)
    // let newSpan = `<span style="font-size:${e.target.value}px">${ selectText }</span>`
    // console.log(toolbar.fontSize, selectedTag, selectText);
    // this.formatDoc("InsertHTML", ()=>{},  newSpan)
  }

  changeFontFamily=(e)=>{
    const { toolbar, } = this.state
    const { value } = e.target
    let label = toolbar.fontFamilyOptions.filter(opt=>opt.value === value)
    this.setState({ toolbar: { ...toolbar, currentFontFamily: label[0] } })
    this.formatDoc("fontname", ()=>{},  label[0].value)
  }

  changeFontSizeBlur=(e)=>{
    const { toolbar, selectedTag, selectText } = this.state
  
  }

  getFontInt=(size)=>{
    let int = size.replace("px", '')
    return Number(int)
  }

  increaseFontSize=(e)=>{
    const { toolbar, selectedTag, selectText } = this.state
      if(selectText){
        let newSpan = `<span style="font-size:${toolbar.fontSize + 1}px">${ selectText }</span>`
        this.formatDoc("InsertHTML", ()=>{
          this.node = window.getSelection().anchorNode.parentElement;
          this.setState({
            selectedTag: null, 
            selectText: "",
            toolbar: {...toolbar, fontSize: Number(toolbar.fontSize) + 1}
          })
        },  newSpan)
      } else{
        if(this.node){
          let oldFontSize = this.getFontInt(this.node.style.fontSize)
    
          this.node.style.fontSize = (oldFontSize + 1 ) +"px"    
          this.setState({
            toolbar: {...toolbar, fontSize: oldFontSize + 1}
          })
        }
      } 
  }

  decreaseFontSize=(e)=>{
    const { toolbar, selectedTag, selectText } = this.state
    
    if(selectText){
        let newSpan = `<span style="font-size:${ Number(toolbar.fontSize) - 1}px">${ selectText }</span>`
        this.formatDoc("InsertHTML", ()=>{
          this.node = window.getSelection().anchorNode.parentElement;
          this.setState({
            selectedTag: null, 
            selectText: "",
            toolbar: {...toolbar, fontSize: Number(toolbar.fontSize) - 1}
          })
        },  newSpan)

    } else{
        if(this.node){
          let oldFontSize = this.getFontInt(this.node.style.fontSize)
          this.node.style.fontSize = (oldFontSize - 1 ) +"px"    
          this.setState({
            toolbar: {...toolbar, fontSize: oldFontSize - 1}
          })
        }
      }
  }

  cFont=(e)=>{
    const { toolbar, selectedTag, selectText } = this.state
    let newSpan = `<span style="font-size:${toolbar.fontSize}px">${document.getSelection()}</span>`
    let se = document.getSelection();
    console.log(se.baseNode);
    this.formatDoc("InsertHTML", ()=>{},  newSpan)
    console.log("DSFFFFFFFF");
  }

  makeStrikeThrough=()=>{
    this.formatDoc("strikeThrough", ()=>{

    })
  }

  makeAlignLeft=(e)=>{
    this.formatDoc("justifyleft", ()=>{

    })
  }
  makeAlignRight=(e)=>{
    this.formatDoc("justifyright", ()=>{

    })
  }
  makeAlignCenter=(e)=>{
    this.formatDoc("justifycenter", ()=>{

    })
  }
  makeAlignJustify=(e)=>{
    this.formatDoc("justifyFull", ()=>{

    })
  }
  redo=(e)=>{
    this.formatDoc("redo", ()=>{})
  }
  undo=(e)=>{
    this.formatDoc("undo", ()=>{})
  }
  makeCopy=()=>{
    this.formatDoc("copy", ()=>{})
  }
  makeCut=()=>{
    this.formatDoc("cut", ()=>{})
  }
  makePaste=()=>{
    this.formatDoc("paste", ()=>{})
  }
  makeSelectAll=()=>{
    this.formatDoc("selectAll", ()=>{})
  }
  mekeDeleteLine=()=>{
    this.formatDoc("delete", ()=>{})
  }
  removeFormat=()=>{
    this.formatDoc("removeFormat", ()=>{})
  }
  openCreateLinkPanel=()=>{
    const { openCreateLinkModal } = this.state
    this.setState({openCreateLinkModal:  {...openCreateLinkModal, isModalOpen: !openCreateLinkModal.isModalOpen}})
  }
  handleChangeLink=(e)=>{
    const { openCreateLinkModal } = this.state
    const { name, value, type} = e.target 
    let valueBinding = {...openCreateLinkModal}
    valueBinding[name] = value
    this.setState({ openCreateLinkModal: valueBinding })
  }
  saveCreateLink=()=>{
    const { url, display, alt, openNew } = this.state.openCreateLinkModal
    let newLink = `<a href="${url}" target="${openNew ? '_blank' : '_self'}" alt="${alt}">${display}</a>`
    this.formatDoc("InsertHTML", ()=>{
      if(document.getSelection().baseOffset > 0){
        this.setState({
          openCreateLinkModal: {
            ...this.state.openCreateLinkModal, 
            isModalOpen: false
          }
        })
      }
    }, newLink)
  }
  openAddImagePanel=(e)=>{
    const { openCreateAddImageModal } = this.state
    this.setState({openCreateAddImageModal:  {...openCreateAddImageModal, isModalOpen: !openCreateAddImageModal.isModalOpen}})
  }
  handleChangeAddImage=(e)=>{
    const { openCreateAddImageModal } = this.state
    let altEmpty = false
    const { name, value, type } = e.target
    let updatedState = {...openCreateAddImageModal}
    if(name !== 'image'){
      updatedState[name] = value
    } else{
      let extension = value.fileName.slice(value.fileName.lastIndexOf(".")+1, value.fileName.length)
      updatedState[name] = {
        ...updatedState[name],
        fileName: value.fileName,
        dataUrl: value.dataUrl,
        extension: extension
      }
      if(updatedState.imageDescription === ''){
        updatedState.imageDescription = value.fileName
      }
    }
    this.setState({ openCreateAddImageModal: updatedState })
  }
  //? uplaod Image
  saveImage=()=>{
    const { openCreateAddImageModal } = this.state
    const { image, imageDescription,  upload } = openCreateAddImageModal

    const createImageTag = (url, alt, status)=>{
      let newImage = `<span class="image-wrapper style="overflow: auto;"> 
        <img data-upload-status="${status}" src="${url}" alt="${alt}"/> 
      </span>`

      this.formatDoc("InsertHTML", ()=>{
        if(document.getSelection().baseOffset > 0){
          this.setState({openCreateAddImageModal:  {
            imageDescription: '',
            image: {}, 
            upload: false,
            isModalOpen: false,
            uploading: false
          }})
        }
      }, newImage)
    }    

    if(upload){
      if(this.props.imageUploader){
        this.setState({ 
          openCreateAddImageModal: {
            ...openCreateAddImageModal,
            uploading: true
          },
        })
        this.props.imageUploader({dataUrl: image.dataUrl, fileName: image.fileName, extension: image.extension }) 
        .then(data=>{
          if(data.url){
            createImageTag(data.url, imageDescription, true)
          }
        })
      } 
    } else{
      createImageTag(image.dataUrl, imageDescription, false)
    }
  }
  makePrint=()=>{
    const { doc } = this.state
    var prntWin = window.open("", "_blank", "width=600,height=800,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes");
    prntWin.document.open();
    prntWin.document.write("<!doctype html><html><head><title>Print<\/title><\/head><body onload=\"print();\">" + doc.innerHTML + "<\/body><\/html>");
    prntWin.document.close();
  }
  showPreviewCode=(e)=>{
    const { toolbar, doc } = this.state
    const previewCode = toolbar.previewCode
      if (!previewCode) {
        this.innerHtml = doc.innerHTML;
        let oContent = document.createTextNode(doc.innerHTML);
        doc.innerHTML = "";
        var oPre = document.createElement("pre");
        oPre.classList.add("codePreview_Pre")
        oPre.style.minHeight = doc.style.minHeight
        doc.contentEditable = false;
        oPre.id = "sourceText";
        oPre.contentEditable = true;
        oPre.appendChild(oContent);
        doc.appendChild(oPre);
        document.execCommand("defaultParagraphSeparator", false, "div");
        this.setState({
          code: this.innerHtml,
          toolbar: {...toolbar, previewCode: true}
        })
        // console.log(this.innerHtml);
      } else{
        let p = doc.querySelector(".codePreview_Pre")
        if(p){
          this.innerHtml = p.innerText
          doc.removeChild(p)
          doc.innerHTML = this.innerHtml
          doc.contentEditable = true;
          doc.focus();
          // console.log(this.innerHtml);
          this.setState({
            toolbar: {...toolbar, previewCode: false, code: this.innerHtml}
          }, ()=> {
            console.log(this.state.code);
            this.innerHtml = ''})
        }
        this.setState({
          toolbar: {...toolbar, previewCode: false}
        })
      }
  }
  handleMouseDown=(e)=>{
    this.mouseDown = true      
  }
  handleWinMouseUp=(e)=>{
    this.mouseDown = false   
    this.exitImageResize()
  }
  handleWinMouseMove=(e)=>{
    let aspectRatio = true
    if(this.mouseDown){
      let imgTag = this.node.querySelector('img')
      if(imgTag.naturalWidth > 0){
        let x = e.pageX - imgTag.offsetLeft;
        let width = x - imgTag.offsetLeft
        imgTag.style.width = width + 'px' 
        let height = undefined
        if(!aspectRatio){
          let y = e.pageY - imgTag.offsetTop;
          let height = y - imgTag.offsetLeft
          imgTag.style.height = height + 'px' 
        }
      }
    }
  }
  exitImageResize=()=>{
    const { doc } = this.state

    let api = "http://localhost:4000"

    let imgDiv = this.node.querySelector(".img")
    // console.log("reupload Image");
    let img = imgDiv.querySelector("img")
    let imageLink = img.src
    let imageName  = imageLink.split(`${api}/`)[1]
    
    //? Re create canvas image using new image size and upload this api server 
    // img.setAttribute("crossorigin", "anonymous")
    // let canvas = document.createElement('canvas')
    // let context = canvas.getContext('2d')

    // canvas.width = img.width
    // canvas.height = img.height

    // context.drawImage(img, 0, 0, img.width, img.height)
    // console.log(canvas.toDataURL("image/png", 1));

    // canvas.toBlob((blob)=>{
    //   img.removeAttribute("crossorigin")
    //   if(blob){
    //     this.props.imageUploadOnResize(blob, imageName)
    //     .then(link=>{
    //       console.log(link);
    //     })
    //   }
    // }, "image/png", 0.92)

    let im = imgDiv.innerHTML
    this.node.innerHTML = ''
    this.node.innerHTML = im
    doc.contentEditable = true;
    doc.focus()
    // window.removeEventListener("mousemove", this.handleWinMouseMove)
    document.removeEventListener("mouseup", this.handleWinMouseUp)
  }
  imageResize=()=>{
    const { toolbar, doc } = this.state
    let imgWrapper = null
    let sel = document.getSelection().baseNode
    if(sel.classList.contains("image-wrapper")){
      imgWrapper = sel
      this.node = imgWrapper
    }

    let imgTag = imgWrapper.innerHTML;

    let res = `
      <div class="image_Wrapper">
          <div class="img" style="display: flex" >
            ${imgTag}
          </div>
       
       <span class="bar dragbar_t"></span>
       <span class="bar dragbar_b"></span>
       <span class="bar dragbar_l"></span>
       <span class="bar dragbar_r"></span>
       <span class="bar dragbar_tl"></span>
       <span class="bar dragbar_tr"></span>
       <span class="bar dragbar_bl"></span>
       <span class="bar dragbar_br"></span>
       
      </div>
    `
    imgWrapper.innerHTML = ''
    doc.contentEditable = false;
    console.log(imgWrapper);
    imgWrapper.innerHTML = res

    let bars = imgWrapper.querySelectorAll(".bar");
    bars.forEach(bar=>{
      bar.addEventListener("mousedown", this.handleMouseDown, false)
    })
    document.addEventListener("mouseup", this.handleWinMouseUp, false)
    document.addEventListener("mousemove", this.handleWinMouseMove, false)
    // this.setState({ 
    //   selectedTag: imgWrapper ? imgWrapper : null,
    //   toolbar: { 
    //     ...toolbar, 
    //     imageResize: !toolbar.imageResize 
    //   } 
    // })
  }
  
  render(){
    const { code, openCreateLinkModal, openCreateAddImageModal, toolbar } = this.state
    const { isModalOpen, url, display, alt, openNew } = openCreateLinkModal
    
    const { minHeight } = this.props
 
    return (
      <div className="editor_wrapper">
        
        <ul className="m_toolbar">

        <Container fluid>
          <Row >
          <Col justify="center" className="d-flex" col="12" sm="12" md="4" lg="4">
            <div className="toolbar_group">
              <li onClick={this.undo} className="toolbarItem">
                <button className="btn_reset">
                  <i className="far fa-undo"></i>
                </button>
              </li>
              <li onClick={this.redo} className="toolbarItem">
                <button className="btn_reset" >
                  <i className="far fa-redo"></i>
                </button>
              </li>
            </div>

             {/* copy cut paste clear */}
          <div className="toolbar_group">
            <li onClick={this.makeCopy} className="toolbarItem">
              <button className="btn_reset">
                <i className="far fa-copy"></i>
              </button>
            </li>
            <li onClick={this.makeCut} className="toolbarItem">
              <button className="btn_reset">
                <i className="far fa-cut"></i>
              </button>
            </li>
            <li onClick={this.makePaste} className="toolbarItem">
              <button className="btn_reset" >
                <i className="far fa-paste"></i>
              </button>
            </li>
            <li onClick={this.mekeDeleteLine} className="toolbarItem">
              <button className="btn_reset">
              <i className="far fa-trash"></i>
              </button>
            </li>
            <li onClick={this.removeFormat} className="toolbarItem">
              <button className="btn_reset" >
                <svg width="24" height="24"><path d="M13.2 6a1 1 0 010 .2l-2.6 10a1 1 0 01-1 .8h-.2a.8.8 0 01-.8-1l2.6-10H8a1 1 0 110-2h9a1 1 0 010 2h-3.8zM5 18h7a1 1 0 010 2H5a1 1 0 010-2zm13 1.5L16.5 18 15 19.5a.7.7 0 01-1-1l1.5-1.5-1.5-1.5a.7.7 0 011-1l1.5 1.5 1.5-1.5a.7.7 0 011 1L17.5 17l1.5 1.5a.7.7 0 01-1 1z" fillRule="evenodd"></path></svg>
              </button>
            </li>
            <li onClick={this.makeSelectAll} className="toolbarItem">
              <button className="btn_reset" >
                <svg width="24" height="24"><path d="M3 5h2V3a2 2 0 00-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2a2 2 0 00-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8a2 2 0 002-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2zM7 17h10V7H7v10zm2-8h6v6H9V9z" fillRule="nonzero"></path></svg>
              </button>
            </li>
          </div>


          <div className="toolbar_group">
            <li onClick={this.makeBoldText} className="toolbarItem">
              <button className="btn_reset" >
                <i style={{color : toolbar.bold ? '#12fb4f': ''}} className="far fa-bold "></i>
              </button>
            </li>

            <li onClick={this.makeStrikeThrough} className="toolbarItem">
              <button className="btn_reset" >
                <i  style={{color : toolbar.strikeThrough ? '#12fb4f': ''}} className="t far fa-strikethrough"></i>
              </button>
            </li>
            <li onClick={this.makeUnderLine} className="toolbarItem">
              <button className="btn_reset" >
                <i  style={{color : toolbar.underline ? '#12fb4f': ''}} className="t far fa-underline"></i>
              </button>
            </li>

            <li  onClick={this.makeItalic} className="toolbarItem" >
              <button className="btn_reset">
                <i style={{color : toolbar.italic ? '#12fb4f': ''}} className="t fa fa-italic"></i>
              </button>
            </li>
          </div>
         

         
         
          <div className="toolbar_group">
            <li className="toolbarItem">
              <button className="btn_reset" onClick={(e)=>this.openColorPanel(e, false)}> 
                <span style={{color: toolbar.forgroundColor, pointerEvents: "none"}}  className="text_color">
                  <i className="far fa-font"></i>
                </span>
                <Input 
                  type="color"
                  value={toolbar.forgroundColor} 
                  className="forgroundColor" 
                  // onChange={this.handleColorChange}
                />
              </button>
            </li>
            <li className="toolbarItem">
              <button className="btn_reset" onClick={(e)=>this.openColorPanel(e, true)}> 
                <span style={{pointerEvents: "none"}} className="background_color">
                  <span><i className="far fa-font"></i></span>
                  <span style={{background: toolbar.backgroundColor}} className="color_bar"></span>
                </span>
                <Input 
                  type="color" 
                  value={toolbar.backgroundColor}
                  className="backgroundColor" 
                  // onChange={this.handleChangeBackground}
                />
              </button>
            </li>

          </div>  


          </Col>
          <Col justify="center" className="d-flex" col="12" sm="12" md="4" lg="4" >
          

          <div className="toolbar_group">
            <li className="toolbarItem">
              <div className="tag_selector">
                <Select onChange={this.changeTag} options={toolbar.options} value={toolbar.currentTag.value} />
              </div>
            </li>
            <li className="toolbarItem">
              <Select onChange={this.changeFontFamily} options={toolbar.fontFamilyOptions} value={toolbar.currentFontFamily.value} />
            </li>
          </div>
       

          {/* <li onClick={this.cFont} className="toolbarItem">
            <button  className="btn_reset">
              FontSize
            </button>
          </li> */}

          <div className="toolbar_group">
            <li onClick={this.increaseFontSize} className="toolbarItem">
              <button  className="btn_reset big_font">
                <div className="font_changer">
                  <span><i className="far fa-font"></i></span>
                  <span className="plus">+</span>
                </div>
              </button>
            </li>
            <li onClick={this.decreaseFontSize} className="toolbarItem">
              <button  className="btn_reset small_font">
              <div className="font_changer">
                  <span><i className="far fa-font"></i></span>
                  <span className="plus">-</span>
                </div>
              </button>
            </li>
        

            <li className="toolbarItem">
              <Input 
                className="fontSize" 
                type="number" 
                value={toolbar.fontSize} 
                name="fontSize"
                onChange={this.changeFontSize}
                onBlur={this.changeFontSizeBlur}
                // onClick={this.cFont}
              
                />
            </li>
          </div>
          
          </Col>

        <Col justify="center" className="d-flex" col="12"  sm="12" md="4" lg="4" >

             
          
        <div className="toolbar_group">
            <li onClick={this.makeAlignLeft} className="toolbarItem">
              <button className="btn_reset">
                <i className="t far fa-align-left"></i>
              </button>
            </li>
            <li onClick={this.makeAlignCenter}  className="toolbarItem">
              <button className="btn_reset">
                  <i className="t far fa-align-center"></i>
              </button>
            </li>
            <li onClick={this.makeAlignRight}  className="toolbarItem">
              <button className="btn_reset">
                  <i className="t far fa-align-right"></i>
              </button>
            </li>
            <li onClick={this.makeAlignJustify}  className="toolbarItem">
              <button className="btn_reset">
                  <i className="t far fa-align-justify"></i>
              </button>
            </li>
          </div>

          <div className="toolbar_group modal">
            { isModalOpen && 
              <div className="create_link_modal">
                  <Input onChange={this.handleChangeLink} name="url" value={url} type="text" label="URL" /> 
                  <Input onChange={this.handleChangeLink}  name="display" value={display} type="text" label="Text to display" />   
                  <Input onChange={this.handleChangeLink}  name="alt" value={alt} label="Alt" />
                <div className="create_link_modal--checkbox">
                  <Checkbox onChange={this.handleChangeLink}  value={openNew} name="openNew" color="blue" />
                    <label htmlFor="">Open In New Window</label>
                  </div>
                  <br/>
                  <Button onClick={this.saveCreateLink} my="10" mx="auto" block  theme="blue">Save</Button>
                </div>
              }
            <li onClick={this.openCreateLinkPanel} className="toolbarItem">
              <button  className="btn_reset">
              <i className="fas fa-paperclip"></i>
              </button>
            </li>
            <li onClick={this.imageResize} className="toolbarItem">
              <button style={{color: toolbar.imageResize ? "red" : null}} className="btn_reset">
              <i className="fa fa-expand"></i>
              </button>
            </li>


            {/* image add panel */}
            { openCreateAddImageModal.isModalOpen && 
              <div className="upload_image_modal">
                { 
          openCreateAddImageModal.uploading && <h3>Uploading...</h3>
                }
                <Input 
                  onChange={this.handleChangeAddImage} 
                  name="image" 
                  type="file" 
                  label="Select An Image"
                 /> 
                  <Input 
                    size="sm"
                    onChange={this.handleChangeAddImage}  
                    name="imageDescription" 
                    value={openCreateAddImageModal.imageDescription} 
                    label="Image Description (Alt)" 
                  />

                <div className="create_link_modal--checkbox">
                  <Checkbox 
                    onChange={this.handleChangeAddImage}  
                    value={openCreateAddImageModal.upload} 
                    name="upload" 
                    color="blue"
                  />
                    <label htmlFor="">Upload Now</label>
                  </div>
                  <br/>
                  <Button onClick={this.saveImage} my="10" mx="auto" block theme="blue">Add</Button>
                </div>
              }
            <li onClick={this.openAddImagePanel} className="toolbarItem">
              <button  className="btn_reset">
              <i className="fa fa-image"></i>
              </button>
            </li>
           
            
          </div>

          <div className="toolbar_group">
            <li onClick={this.makePrint} className="toolbarItem">
              <button className="btn_reset">
              <i className="fas fa-print    "></i>
              </button>
            </li>
            
            <li onClick={this.showPreviewCode} className="toolbarItem">
              <button style={{color: toolbar.previewCode ? 'red' : null }} className="btn_reset">
              <i className="far fa-code"></i>
              </button>
            </li>
            
            
          </div>
        
        
        </Col>

              
        </Row>
        </Container>
          


         </ul>
      
        <div className="raw_editor_wrapper">
        <div 
          style={{minHeight : minHeight ? minHeight : null }}
          spellCheck="false"
          ref={this.editableRef}
          className="m_editor"
          onClick={this.editContent} 
          contentEditable={true}
          onMouseUp={this.selection}   
          onInput={this.handleChange}
          onKeyUp={this.handleKeyup} 
        >
           
      </div>
      </div>
      </div>
    )
  }
}

export default MyRichText2