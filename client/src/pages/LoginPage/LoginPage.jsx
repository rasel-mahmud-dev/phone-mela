import React from 'react'
import {connect} from 'react-redux'
import {Col, Container} from "../../components/Layout";
import Row from "../../components/Layout/Row/Row";
import Input2 from "../../components/Form/Input/Input2";
import Button from "../../components/Button/Button";
import Preload from "../../components/Preload/Preload";
import {login} from "../../store/actions/authAction";

const LoginPage = (props) => {

  const [state, setState] = React.useState({
    email: { value: "", tauched: false, errorMessage: "" },
    password: { value: "", tauched: false, errorMessage: "" }
  })

  function handleChange({ target: { name, value, type } }){

    setState({
      ...state, 
      [name]:{
        ...state[name],
        value: value
      } 
    })
  }

  function handleLogin(e){
    e.preventDefault()
    let isComplete = true;
    let body = {}
    for(let key in state){
      isComplete = isComplete 
      && !!state[key].value 
      // && state[key].tauched 
      && !state[key].errorMessage
      body[key] = state[key].value
    }
    if(isComplete){
      props.login(body, props.history.push)
    }
  }


  return (
    <Container >
      <Row justify="center">
        <Col col={12} md={6}>
          <h2>Signin Form</h2>
          <form onSubmit={handleLogin} >
            <Input2 
              name="email"
              label="Enter Email"
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
            <Button  mt={10} theme="blue">Login</Button>
          </form>
          <p>Not an Account ? Sign Up <strong><Preload to="/auth/signup">here</Preload></strong> </p>
        </Col>
      </Row>
    </Container>
  )
}

export default connect(null, {login})(LoginPage)
