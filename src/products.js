import fetch, {postForm, fetchJSON} from './fetch'
import store from './store'
import {baseUrl} from './config'

export const baseFavoritesUrl = `${baseUrl}/items`
export const baseProductUrl = `${baseUrl}/items`
export const categoriesUrl = `${baseUrl}/categories`
export const auctionUrl = `${baseUrl}/auctions/`
export const profileUser = `${baseUrl}/user/me`

export function fetchProducts(){
    return fetchJSON(baseProductUrl)
}
export function fetchFavorites(){
    return fetchJSON(baseFavoritesUrl)
}

export function fetchProduct(id){
    return fetchJSON(`${baseProductUrl}/${id}`)
}
export function fetchEach(items){
    return Promise.all(items.map(fetchProduct))
}

export function getCategories(){
    return fetchJSON(categoriesUrl)
}
export function getFavorites(){
    console.log("favs",store.getState())
    return fetchJSON(`${baseUrl}/users/${store.getState().user.userId}/favorites`)
}

export function favorite(auctionId){
    return participateInAuction(auctionId)
}

export function unfavorite(auctionId){
    let url = `${baseUrl}/auctions/${auctionId}/unfavorite`
    return fetch(url)    
}
export function participateInAuction(auctionId){
    let url = `${baseUrl}/auctions/${auctionId}/participate`
    return fetch(url)
}

export function uploadFile(file){
    return postForm(`${baseUrl}/uploadFile`, file)
}

export function getAuctionDetails(auctionId){
    let url = `${baseUrl}/auctions/${auctionId}`
    return fetchJSON(url)
}
export function setBid(bidObject){
    let url = `${baseUrl}/bids/saveBid`
    return fetchJSON(url,{method: 'POST',body:JSON.stringify(bidObject)})
}
export function getBidDetails(bidId){
    let url = `${baseUrl}/bids/${bidId}`
    return fetchJSON(url)
}
export function getUserDetails(){
    return fetchJSON(profileUser)
}

export function login(body){
    return fetchJSON(`${baseUrl}/login`, {method:'POST', body:JSON.stringify(body), mode:'cors'})
}

export function newToday(){
    return fetchJSON(`${baseUrl}/end-today`)
}
export function endToday(){
    return fetchJSON(`${baseUrl}/new-today`)
}