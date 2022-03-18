import React, {Suspense} from "react";
import {connect} from "react-redux"
import "./App.scss";
import {fetchCurrentAuth} from "./store/actions/authAction"
import routes from "./routes";
import Navigation from "./Common/Navigation"

import {Redirect, Route, Switch} from "react-router-dom";
import ProgressBar from "./components/ProgressBar/ProgressBar"



const App = (props) => {
  React.useEffect(() => {
    props.fetchCurrentAuth()
    
    const loader_backdrop = document.querySelector(".loader_backdrop")
    loader_backdrop.remove()
  
  
  }, [])
  
  const {auth, tools} = props
  const normalRoutes = ["/auth/login", "/auth/signup"]
  
  
  return (
    <div className="App">
      <Navigation/>
      {/*<Backdrop isShowBackdrop={tools.isShowBackdrop}/>*/}
      
      <Suspense fallback={ProgressBar}>
        <Switch>
          {routes(auth.isAuthenticated, "app").map(route => (
            <Route
              key={route.path}
              exact={route.exact ? true : false}
              path={route.path}
              component={route.component}
            />
          ))}
          
          {normalRoutes.map((route, i) =>
            <Redirect key={i} from={route} to="/not-found"/>
          )}
          
          {auth.isAuthenticated !== null && <Redirect to="/auth/login"/>}
        
        </Switch>
      </Suspense>
      
      
      {/*<Footer></Footer>*/}
    </div>
  );
}
function mapStateToDispatch(state){
  return { auth: state.auth, tools: state.tools }
}


export default connect(mapStateToDispatch, {fetchCurrentAuth})(App);
