import fetch from './fetch'
import store from './store'
import {baseUrl} from './config'

export const baseFavoritesUrl = `${baseUrl}/items`
export const baseProductUrl = `${baseUrl}/items`
export const categoriesUrl = `${baseUrl}/categories`
export const auctionUrl = `${baseUrl}/auctions/`
export const profileUser = `${baseUrl}/user/me`

export function fetchProducts(){
    return fetch(baseProductUrl)
        .then(res => res.json())        
}
export function fetchFavorites(){
    return fetch(baseFavoritesUrl)
        .then(res => res.json())
}

export function fetchEach(items){
    let promises = items.map(item => fetch(`${baseProductUrl}/${item}`).then(res=>res.json()))
    return Promise.all(promises)
}

export function getCategories(){
    return fetch(categoriesUrl)
        .then(res => res.json())
}

export function participateInAuction(auctionId){
    let url = `${baseUrl}/auctions/${auctionId}/participate/${store.getState().user.id}`
    return fetch(url)
}
export function getAuctionDetails(auctionId){
    let url = `${baseUrl}/auctions/${auctionId}`
    return fetch(url)
        .then(res => res.json())
}

export function getUserDetails(){
    return fetch(profileUser)
        .then(res => res.json())
}

export function login(body){
    let a= fetch(`${baseUrl}/login`, {method:'POST', body:JSON.stringify(body), mode:'cors'})
    console.log(a)
    return a
        .then(res => res.json())
}