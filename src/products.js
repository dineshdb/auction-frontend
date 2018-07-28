import fetch from './fetch'
import store from './store'
import {baseUrl} from './config'

export const baseFavoritesUrl = `${baseUrl}/items`
export const baseProductUrl = `${baseUrl}/items`

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