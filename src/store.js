import {createStore} from 'redux'
import {subscribeAuction, unsubscribeAuction} from './socket'

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

export const NEW_BID_PUSH = 'NEW_BID_PUSH'
export const AUCTION_STARTED = 'AUCTION_STARTED'
export const AUCTION_ENDED = 'AUCTION_ENDED'
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE'
export const UPDATE_AUCTION_LIST = 'UPDATE_AUCTION_LIST'

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

export const newBid = payload => ({
    type: NEW_BID_PUSH,
    payload
})
export const auctionStartedAction = payload => ({
    type: AUCTION_STARTED,
    payload
})
export const auctionEndedAction = payload => ({
    type: AUCTION_ENDED,
    payload
})

export const toggleFavorite = payload =>({
    type: TOGGLE_FAVORITE,
    payload
})

export const updateAuctionListAction = payload => ({
    type: UPDATE_AUCTION_LIST,
    payload
})
// reducers
function initializeState(){
    let initialState = {
        user : {},
        products: [],
        auctions: [],
        auctionsStarted: [],
        cart: [],
        subscriptions: [],
        favorites: []
    }    
    let user = JSON.parse(localStorage.getItem(USER_KEY)) || {}
    return Object.assign({}, initialState, {user})
}
const reducer = ( state = initializeState(), action) => {
    switch (action.type){
        case SIGN_IN:
            console.log("NEW USER",action.user)
            localStorage.setItem(USER_KEY, JSON.stringify(action.user))
            let date = Date.now()
            return Object.assign({}, state, {user: action.user, isLoggedIn : true, date})
        case SIGN_OUT:
            localStorage.removeItem(USER_KEY)
            return Object.assign({}, state, {user: {}, isLoggedIn: false, date: null})
        case PRODUCTS_ADD:
            console.log("Products in store",action.payload)
            return {...state, products: action.payload}
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
            console.log("auction subsribed",auctionId)
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

        case AUCTION_STARTED:{
            let id= action.payload
            let auctions = state.auctions
            let index = auctions.findIndex(el => el.id === id)
            let auction = auctions[index]
            auctions = auctions.splice(index, 1)
            //console.log("AUCTIONS STARTED",auctions)
            //auction.state = 'LIVE'
           // return Object.assign({}, state, {auctions: [...auctions, auction]})
            if(index === -1){
                return state
            }
            auctions[index].state = 'LIVE'
            return Object.assign({}, state, {auctions})
        }

        case AUCTION_ENDED: {
            let {id}= action.payload
            let auctions = state.auctions
            let index = auctions.findIndex(el => el.id === id)
            if(index === -1){
                return state
            }
            let auction = auctions[index]
            auctions = auctions.splice(index, 1)
            auction.state = 'ENDED'
            return Object.assign({}, state, {auctions: [...auctions, auction]})
        }

        case NEW_BID_PUSH: {
            let {id, userId, bidAmount} = action.payload
            let auctions = state.auctions
            let index = auctions.findIndex(el => el.id === id)
            let auction = auctions[index]
            auctions = auctions.splice(index, 1)
            auction.bids.push({
                userId,
                bidAmount
            })
            if(auction.highestBid < bidAmount){
                auction.highestBid = bidAmount
                auction.highestBidder = userId
            }
            return Object.assign({}, state, {auctions: [...auctions, auction]})
        }

        case UPDATE_AUCTION_LIST: {
            return Object.assign({}, state, {auctions: action.payload})
        }
        case TOGGLE_FAVORITE:{
            let itemId = action.payload
            let favorites = state.favorites
            let index = favorites.indexOf(itemId)
            console.log(index, itemId)
            if(index > -1){

                favorites.splice(index, 1)
                return Object.assign({}, state, {favorites})
            } else {
                return Object.assign({}, state,{favorites: [...favorites, itemId]})
            }
        }

        case USER_STATUS:
        default:
            return state
    }
}
let store = createStore(reducer)

// Containers
export function getUser(state){
    return state.user
}

export function getUserToken(state) {
    return state.user.header
}

export function isUserOnline(state){
    return state.user.isLoggedIn
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

 export default store
