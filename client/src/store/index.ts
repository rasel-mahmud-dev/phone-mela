import { createStore, applyMiddleware, compose } from 'redux'

import reduxThunk from 'redux-thunk'


import reducers from "./reducers/index"

import api  from '../apis/api'

// @ts-ignore
const composeEnhanchers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(reducers, {},  composeEnhanchers(applyMiddleware(reduxThunk.withExtraArgument(api))));
