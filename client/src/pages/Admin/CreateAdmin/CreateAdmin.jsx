import React from 'react'
import { connect } from 'react-redux'
import { createAdmin } from 'src/store/actions/authAction'
import { Container, Row, Col } from "src/components/Layout"

import Input2 from "src/components/Form/Input/Input2"
import Button from "src/components/Button/Button"


const CreateAdmin = (props) => {

  const [state, setState] = React.useState({
    username: { value: "", tauched: false, errorMessage: "" },
    email: { value: "", tauched: false, errorMessage: "" },
    password: { value: "", tauched: false, errorMessage: "" }
  })

  const { auth, history } = props

  // React.useEffect(()=>{
  //   if(auth.isAdmin){
  //     history.push("/admin/admin-panel")
  //   }
  // }, [auth.isAdmin])

  function handleChange({name, value, type}){

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
      isComplete = isComplete 
      && !!state[key].value 
      // && state[key].tauched 
      && !state[key].errorMessage
      body[key] = state[key].value
    }
    if(isComplete){
      props.createAdmin(body, props.history.push)
    }
  }

  return (
    <Container fluid>
      <Row justify="center">
        <Col mt="20" col={12} md={6}>
          <h2>Create an Account to Control Application</h2>
          <form  onSubmit={handleSignup}>
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
            <Button  mt={10} theme="blue">Create Admin</Button>
          </form>

        </Col>
      </Row>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})




export default connect(mapStateToProps, { createAdmin })(CreateAdmin)
