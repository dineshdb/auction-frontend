import {applyMiddleware, createStore} from 'redux'
import reducer from './reducers'

//const middleware = applyMiddleware(promise(),thunk,logger())

export default createStore(reducer)

