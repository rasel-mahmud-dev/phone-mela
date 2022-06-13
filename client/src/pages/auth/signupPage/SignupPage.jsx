import React from 'react'
import { connect } from 'react-redux'
import { register } from "src/store/actions/authAction"

import Input2 from "UI/Form/Input/Input2"
import Preload from "UI/Preload/Preload"

const signupPage = (props) => {

  const [state, setState] = React.useState({
    firstName: { value: "rasel", touched: false, errorMessage: "" },
    lastName: { value: "mahmud", touched: false, errorMessage: "" },
    email: { value: "rasel@gmail.com", touched: false, errorMessage: "" },
    password: { value: "123", touched: false, errorMessage: "" }
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
		const {lastName, ...other} = state
    for(let key in other){
      isComplete = isComplete && !!state[key].value
      // && state[key].touched
      // && !state[key].errorMessage
    }
		body.last_name = lastName.value
		body.first_name = state.firstName.value
		body.email = state.email.value
		body.password = state.password.value
		
    if(isComplete){
      props.register(body)
    }
  }

  return (
    <div className="container-1200 px-4 pt-4">
  
			<div className="max-w-[600px] mx-auto">
				<h1 className="text-center text-2xl">Create an Account</h1>
				<form onSubmit={handleSignup}>
					<Input2
						name="firstName"
						label="Enter firstName"
						value={state.firstName.value}
						error={state.firstName.errorMessage}
						onChange={handleChange}
					/>
					<Input2
						name="lastName"
						label="Enter lastName"
						value={state.lastName.value}
						error={state.lastName.errorMessage}
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
					<button className="bg-primary-400 text-white !mt-2 btn px-5 !ml-0" >Signup</button>
				</form>
				<p className="mt-4 text-sm font-normal">Already exist an account ? Sign In
					<Preload className="text-primary-400 ml-1 font-medium" to="/auth/login">here</Preload>
				</p>
			</div>
    </div>
  )
}

export default connect(null, { register})(signupPage)
