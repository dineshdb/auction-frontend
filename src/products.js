import fetch, {postForm, fetchJSON} from './fetch'
import store from './store'
import {apiUrl} from './config'

export const baseFavoritesUrl = `${apiUrl}/items`
export const baseProductUrl = `${apiUrl}/items`
export const categoriesUrl = `${apiUrl}/categories`
export const auctionUrl = `${apiUrl}/auctions/`
export const profileUser = `${apiUrl}/user/me`

export function fetchProducts(){
    return fetchJSON(baseProductUrl)
}
export function fetchFavorites(){
    return fetchJSON(baseFavoritesUrl)
}
export function fetchItemsFromCategory(id){
    return fetchJSON(`${apiUrl}/categories/${id}/items`)
}
export function fetchItemDetails(id){
    return fetchJSON(`${apiUrl}/items/${id}`)
}

export function fetchProduct(id){
    return fetchJSON(`${baseProductUrl}/${id}`)
}
export function fetchEach(items){
    console.log("ITEMS",items)
    return Promise.all(items.map(fetchProduct))
}

export function getCategories(){
    return fetchJSON(categoriesUrl)
}

export function addNewCategory(categoryName){
    return fetchJSON(`${apiUrl}/categories`, {method: 'POST', body: JSON.stringify({categoryName})})
}
export function getSearched(search){
    return fetchJSON(`${apiUrl}/search/${search}`)
}
export function getFavorites(){
    return fetchJSON(`${apiUrl}/users/${store.getState().user.userId}/favorites`)
}

export function favorite(auctionId){
    return participateInAuction(auctionId)
}
export function getRating(itemId){
    return fetchJSON(`${baseUrl}/getUsers/item/${itemId}`)
}
export function Rate(itemId,rating){
    return fetchJSON(`${baseUrl}/rate/user/${store.getState().user.userId}/item/${itemId}/${rating}`)
}
export function updateRate(itemId,rating){
    return fetchJSON(`${baseUrl}/updateRating/user/${store.getState().user.userId}/item/${itemId}/${rating}`)
}

export function unfavorite(auctionId){
    let url = `${apiUrl}/auctions/${auctionId}/unfavorite`
    return fetch(url)    
}
export function participateInAuction(auctionId){
    let url = `${apiUrl}/auctions/${auctionId}/participate`
    return fetch(url)
}

export function uploadFile(body){
    return fetchJSON(`${apiUrl}/uploadFile`, {method: 'POST', body})
}

export function getAuctionDetails(auctionId){
    let url = `${apiUrl}/auctions/${auctionId}`
    return fetchJSON(url)
}
export function setBid(bidObject){
    let url = `${apiUrl}/bids/saveBid`
    return fetchJSON(url,{method: 'POST',body:JSON.stringify(bidObject)})
}
export function getBidDetails(bidId){
    let url = `${apiUrl}/bids/${bidId}`
    return fetchJSON(url)
}
export function getUserDetails(){
    return fetchJSON(profileUser)
}

export function login(body){
    return fetchJSON(`${apiUrl}/login`, {method:'POST', body:JSON.stringify(body), mode:'cors'})
}

export function newToday(){
    return fetchJSON(`${apiUrl}/end-today`)
}
export function endToday(){
    return fetchJSON(`${apiUrl}/new-today`)
}
export function userProfile(userId){
    return fetchJSON(`${apiUrl}/users/${userId}`)
}

export function signup(body){
    return fetchJSON(`${apiUrl}/users/sign-up`, {method:'POST', body:JSON.stringify(body), mode:'cors', headers: {
        "Content-Type": "application/json; charset=utf-8",
        // "Content-Type": "application/x-www-form-urlencoded",
    },})
}

export function createAuction(body){
    return fetchJSON(`${apiUrl}/auctions/createAuction`, {method: 'POST', body: JSON.stringify(body)})
}