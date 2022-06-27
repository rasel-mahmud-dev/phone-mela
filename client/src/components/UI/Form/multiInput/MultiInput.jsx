import React from 'react';

import "./multi_input.scss"
const timesdel = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"/></svg>'
const check = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M413.505 91.951L133.49 371.966l-98.995-98.995c-4.686-4.686-12.284-4.686-16.971 0L6.211 284.284c-4.686 4.686-4.686 12.284 0 16.971l118.794 118.794c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-11.314-11.314c-4.686-4.686-12.284-4.686-16.97 0z"/></svg>'

class MultiInput extends React.Component {

    state = {
        values: [],
        value: ""
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            values: this.props.defaultValues
        })
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.defaultValues !== this.props.defaultValues)
        this.setState({
            ...this.state,
            values: this.props.defaultValues
        })
    }

    onInputEnter = (e)=>{
        if(e.key === "Enter"){
            e.preventDefault()
            this.handleEnter()
        }
    }

    deleteSelectedInput = (text)=> {
        let values = this.state.values.filter(v => v !== text)
        this.setState({
            ...this.state,
            values: values
        })
        this.props.onChange
            && this.props.onChange({target: { values: values, name: this.props.name}})
    }

    handleEnter=()=>{
        let updatedState = {...this.state}
        let arrItems = this.state.value.trim().split(" ")
        if(arrItems.length > 0) {

            arrItems.forEach(eachItem=>{
                if(eachItem !== " ") {
                    let idx = updatedState.values.indexOf(eachItem.trim().toLowerCase())
                    if (idx === -1) {
                        updatedState.values.push(eachItem.trim().toLowerCase())
                    } else {
                        updatedState.values.splice(idx, 1)
                    }
                }
            })

            this.props.onChange && this.props.onChange({target: {values: updatedState.values, name: this.props.name}})
            this.setState({
                ...updatedState,
                value: ""
            })
        }
    }

    render() {
        const {placeholder} = this.props
        return (
            <div className="multi-input">
                <div className="selected_input">
                    { this.state.values && this.state.values.map((v, i)=>(
                        <li key={i}>
                            {v}
                            <svg
                                onClick={()=>this.deleteSelectedInput(v)}
                                // dangerouslySetInnerHTML={{__html: timesdel}}
                                className="delete_btn"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"/></svg>
                        </li>
                    )) }
                </div>
                <div className="input-multi-wrapper input-elem">
                    <input
                        name={this.props.name}
                        className=""
                        type="text"
                        placeholder={placeholder}
                        value={this.state.value}
                        onKeyPress={this.onInputEnter}
                        onChange={(e)=>this.setState({...this.state, value: e.target.value})}
                    />
                    <div className="ok_button">
                        {this.state.value && <i onClick={this.handleEnter} dangerouslySetInnerHTML={{__html: check}}/> }
                    </div>
                </div>
            </div>
        );
    }
};

export default MultiInput;