import fetch, {postForm} from './fetch'
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

export function fetchProduct(id){
    return fetch(`${baseProductUrl}/${id}`)
        .then(res => res.json())
}
export function fetchEach(items){
    return Promise.all(items.map(fetchProduct))
}

export function getCategories(){
    return fetch(categoriesUrl)
        .then(res => res.json())
}
export function getFavorites(){
    console.log("USR ID",store.getState().user.id)
    return fetch(`${baseUrl}/users/${store.getState().user.id}/favorites`)
        .then(res=>res.json())
}

export function participateInAuction(auctionId){
    let url = `${baseUrl}/auctions/${auctionId}/participate/${store.getState().user.id}`
    return fetch(url)
}

export function uploadFile(file){
    return postForm(`${baseUrl}/uploadFile`, file)
}

export function getAuctionDetails(auctionId){
    let url = `${baseUrl}/auctions/${auctionId}`
    return fetch(url)
        .then(res => res.json())
}
export function setBid(bidObject){
    let url = `${baseUrl}/bids/saveBid`
    return fetch(url,{method: 'POST',body:JSON.stringify(bidObject)}).then(res=>res.json())
}
export function getBidDetails(bidId){
    let url = `${baseUrl}/bids/${bidId}`
    return fetch(url)
        .then(res=>res.json())
}
export function getUserDetails(){
    return fetch(profileUser)
        .then(res => res.json())
}

export function login(body){
    return fetch(`${baseUrl}/login`, {method:'POST', body:JSON.stringify(body), mode:'cors'})
        .then(res => res.json())
}