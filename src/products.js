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
export function fetchItemsFromCategory(id){
    return fetchJSON(`${baseUrl}/categories/${id}/items`)
}
export function fetchItemDetails(id){
    return fetchJSON(`${baseUrl}/items/${id}`)
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

export function addNewCategory(categoryName){
    return fetchJSON(`${baseUrl}/categories`, {method: 'POST', body: JSON.stringify({categoryName})})
}
export function getSearched(search){
    return fetchJSON(`${baseUrl}/search/${search}`)
}
export function getFavorites(){
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

export function uploadFile(body){
    return fetchJSON(`${baseUrl}/uploadFile`, {method: 'POST', body})
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
export function userProfile(userId){
    return fetchJSON(`${baseUrl}/users/${userId}`)
}

export function signup(body){
    return fetchJSON(`${baseUrl}/users/sign-up`, {method:'POST', body:JSON.stringify(body), mode:'cors', headers: {
        "Content-Type": "application/json; charset=utf-8",
        // "Content-Type": "application/x-www-form-urlencoded",
    },})
}

export function createAuction(body){
    return fetchJSON(`${baseUrl}/auctions/createAuction`, {method: 'POST', body: JSON.stringify(body)})
}