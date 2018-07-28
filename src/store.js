import {createStore} from 'redux'
import wsClient, {subscribeAuction, unsubscribeAuction} from './socket'

const USER_KEY = 'user'

// Action Types
export const SIGN_IN = 'SIGN_IN'
export const SIGN_OUT = 'SIGN_OUT'
export const USER_STATUS = 'USER_STATUS'
export const PRODUCTS_ADD = 'PRODUCTS_ADD'
export const ADD_AUCTION_STARTED = 'ADD_AUCTION_STARTED'
export const ADD_TO_CART = 'ADD_TO_CART'

export const SUBSCRIBE_AUCTION = 'SUBSCRIBE_AUCTION'
export const UNSUBSCRIBE_AUCTION = 'UNSUBSCRIBE_AUCTION'

// Action creators
export const signIn = user =>({
    type : SIGN_IN,
    user
})
export const signout = user =>({
    type: SIGN_OUT
})
export const productsAdd = (products) => ({
    type: PRODUCTS_ADD,
    payload: products
})
export const addToCart = (product) => ({
    type:ADD_TO_CART,
    payload: product
})
export const addAuctionStarted = (id) => ({
    type: ADD_AUCTION_STARTED,
    payload: id
})

export const subscribeAuctionAction = payload => ({
    type: SUBSCRIBE_AUCTION,
    payload
})
export const unsubscribeAuctionAction = payload => ({
    type: UNSUBSCRIBE_AUCTION,
    payload
})

// reducers
let initialState = JSON.parse(localStorage.getItem(USER_KEY))
if(initialState == null) {
    initialState = {
        user : {},
        products: [],
        auctionsStarted: [],
        cart: [],
        subscriptions: [],
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
        case PRODUCTS_ADD:
            console.log("Products in store",action.payload)
            return {...state,products: action.payload}
        case ADD_AUCTION_STARTED:
            console.log("NEW AUCTION",action.payload)
            let withNewAuction = state.auctionsStarted
            withNewAuction.push(action.payload)
            return {...state,products: withNewAuction}
        case ADD_TO_CART:
            console.log("ADDING PRODUCT TO CART",action.payload)
            let newCartWithProduct = state.cart
            return {...state,cart: newCartWithProduct}

        case SUBSCRIBE_AUCTION:
            let auctionId = action.payload
            subscribeAuction(auctionId)
            let subscriptions = Object.assign({}, state.subscriptions)
            return Object.assign({}, state, {subscriptions: [...subscriptions, auctionId]})

        case UNSUBSCRIBE_AUCTION:{
            unsubscribeAuction(action.payload)
            let subscriptions = state.subscriptions
            let index = subscriptions.findIndex( el => el === action.payload)
            if(index > -1){
                subscriptions = subscriptions.splice(index, 1)
                return Object.assign({}, state, {subscriptions})
            }
            return state
        }

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

export function getProducts(state){
    return state.products
}

const mapStateToProps = state => ({
    user: getUser(state),
    token: getUserToken(state),
    isOnline: isUserOnline(state),
    products: getProducts(state)
})
  
const mapDispatchToProps = dispatch => ({
    signin: data => dispatch(signIn(data)),
    signout: data => dispatch(signout(data)),
    addProducts: data => dispatch(productsAdd(data))
 })