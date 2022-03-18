import React from 'react'
import { connect } from 'react-redux'
import { register } from "src/store/actions/authAction"

import { Container, Row, Col } from "src/components/Layout"
import Input from "src/components/Form/Input/Input"
import Input2 from "src/components/Form/Input/Input2"
import Button from "src/components/Button/Button"
import Preload from "src/components/Preload/Preload"
import Box from "src/components/Box/Box"


const SignupPage = (props) => {

  const [state, setState] = React.useState({
    username: { value: "", tauched: false, errorMessage: "" },
    email: { value: "", tauched: false, errorMessage: "" },
    password: { value: "", tauched: false, errorMessage: "" }
  })

  function handleChange({target: {name, value, type}}){
    setState({
      ...state, 
      [name]:{
        ...state[name],
        value: value
      } 
    })

  }

  function handleSignup(e){
    e.preventDefault()
    let isComplete = true;
    let body = {}
    for(let key in state){
      isComplete = isComplete && !!state[key].value
      // && state[key].tauched 
      // && !state[key].errorMessage
      body[key] = state[key].value
    }
    if(isComplete){
      props.register(body, props.history.push)
    }
  }

  return (
    <Container fluid>
      <Row justify="center">
        <Col col={12} md={6}>
          <h2>Signup Form</h2>
          <form onSubmit={handleSignup}>
            <Input2 
              name="username"
              label="Enter Username"
              value={state.username.value}
              error={state.username.errorMessage}
              onChange={handleChange}
            />
            <Input2 
              label="Enter Email"
              name="email"
              value={state.email.value}
              error={state.email.errorMessage}
              onChange={handleChange}
            />
            <Input2 
              name="password"
              label="Enter Password"
              value={state.password.value}
              error={state.password.errorMessage}
              onChange={handleChange}
            />
            <Button  mt={10} theme="blue">Signup</Button>
          </form>
          <p>Already exists an account ? Sign In <strong><Preload to="/auth/login">here</Preload></strong> </p>
        </Col>
      </Row>
    </Container>
  )
}

export default connect(null, { register})(SignupPage)
