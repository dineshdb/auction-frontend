import store from './store'

export function fetchApi(path, options){
    let defaults = {
        headers : {
            'Authorization': store.getState().user.header,    
        },
        mode : 'cors'
    }
    return fetch(path, Object.assign(defaults, options))
}

export function fetchJSON(path, options){
    return fetchApi(path, options).then(res => res.json())
}
export function postForm(url, body){
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': store.getState().user.header,
        },
        body,
    }
    return fetchJSON(url, options)
}

export default fetchApi