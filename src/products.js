import fetch, {postForm} from './fetch'
import store from './store'
import {baseUrl} from './config'

export const baseFavoritesUrl = `${baseUrl}/items`
export const baseProductUrl = `${baseUrl}/items`
export const categoriesUrl = `${baseUrl}/categories`

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

export function participateInAuction(auctionId){
    let url = `${baseUrl}/auctions/${auctionId}/participate/${store.getState().user.id}`
    return fetch(url)
}

export function uploadFile(file){
    return postForm(`${baseUrl}/uploadFile`, file)
}