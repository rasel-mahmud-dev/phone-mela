import React from 'react'
import {connect} from 'react-redux'
import {Col, Container} from "src/components/UI/Layout";
import Input2 from "src/components/UI/Form/Input/Input2";
import Preload from "src/components/UI/Preload/Preload";
import {login} from "src/store/actions/authAction";
import Loader from "src/components/UI/Loader/Loader"
import Helmet from "react-helmet";
import {useNavigate, useSearchParams} from "react-router-dom";

const LoginPage = (props) => {
  
  const [state, setState] = React.useState({
    email: { value: "", touched: false, errorMessage: "" },
    password: { value: "", touched: false, errorMessage: "" }
  })

  const navigator = useNavigate()

  const [message, setMessage] = React.useState("")
  const [fetchLoading, setFetchLoading] = React.useState(false)
  
  let [searchParams, setSearchParams] = useSearchParams();
  
  
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
    
    
    setMessage("")
    setFetchLoading(true)
    
    let isComplete = true;
    let body = {}
    for(let key in state){
      isComplete = isComplete
        && !!state[key].value
        // && state[key].touched
        && !state[key].errorMessage
      body[key] = state[key].value
    }
    if(isComplete){
      props.login(body,  (err, result)=>{
        setFetchLoading(false)
        if(err){
          console.log(err)
          setMessage(err)
        }
        let callback = searchParams.get("callback");
        navigator(callback)
      })
    }
  }
  
  function renderForm(){
    return (

      <div className="max-w-[500px] mx-auto">
      
         <h2>Signin Form</h2>
  
        { fetchLoading ? <div className="flex justify-center flex-col my-4 relative">
          <div className="mx-auto">
            <Loader />
          </div>
          <h4 className="text-sm font-medium text-primary text-center">Please wait you are logged...</h4>
        </div> :
          message && (
          <div className="bg-red-400/10 text-red-400 text-center py-2 font-normal text-sm">
            {message}
          </div>
        ) }
        
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
            <button className={["mt-4 px-4 btn text-white",  fetchLoading ? "bg-primary-950 pointer-events-none" : "bg-primary-400" ].join(" ")}>Login</button>
          </form>
          <p className="mt-4 text-sm font-normal ">  Not an Account ? Sign Up <strong><Preload to="/auth/signup">here</Preload></strong> </p>

      </div>
    )
  }
  
  return (
    <Container  >
  
      <div className="mt-8">
        <Helmet>
          <link rel="canonical" href={`https://phone-mela.vercel.app/#/auth/login`} />
          <title>Login to phone-mela.vercel.app</title>
          {/*<meta*/}
          {/*  name="description"*/}
          {/*  content="Get stats about every music from every movie"*/}
          {/*/>*/}
          {/*<meta*/}
          {/*  name="keywords"*/}
          {/*  content="Music, Audio, Lyrics"*/}
          {/*/>*/}
        </Helmet>
        {renderForm()}
      </div>
      
      
    </Container>
  )
}

export default connect(null, {login})(LoginPage)
