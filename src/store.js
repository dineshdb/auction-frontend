import {createStore} from 'redux'
import { connect } from 'react-redux'

const USER_KEY = 'user'

// Action Types
const SIGN_IN = 'SIGN_IN'
const SIGN_OUT = 'SIGN_OUT'
const USER_STATUS = 'USER_STATUS'

// Action creators
export const signIn = user =>({
    type : SIGN_IN,
    user
})
export const signout = user =>({
    type: SIGN_OUT
})

// reducers
let initialState = JSON.parse(localStorage.getItem(USER_KEY))
if(initialState == null) {
    initialState = {
        user : {}
    }
}
const reducer = ( state = initialState, action) => {
    switch (action.type){
        case SIGN_IN:
            localStorage.setItem(USER_KEY, JSON.stringify(action.user))
            let date = Date.now()
            return Object.assign({}, state, {user: action.user, isLoggedIn : true, date})
        case SIGN_OUT:
            localStorage.removeItem(USER_KEY)
            return Object.assign({}, state, {user: {}, isLoggedIn: false, date: null})
        case USER_STATUS:
        default:
            return state
    }
}
let store = createStore(reducer)
export default store

// Containers
export function getUser(state){
    return state.user
}

export function getUserToken(state) {
    return state.user.token
}

export function isUserOnline(state){
    return state.user.token !== null
}

const mapStateToProps = state => ({
    user: getUser(state),
    token: getUserToken(state),
    isOnline: isUserOnline(state)
})
  
const mapDispatchToProps = dispatch => ({
    signin: data => dispatch(signIn(data)),
    signout: data => dispatch(signout(data)),
 })