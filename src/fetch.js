import store from './store'

export function fetchApi(path, options){
    let defaults = {
        headers : {
            'Authorization': store.getState().user.header,    
        },
        mode : 'cors'
    }
    options = Object.assign({}, defaults, options)
    return fetch(path, options)
}

export function fetchJSON(path, options){
    return fetchApi(path, options).then(res => res.json())
}
export function postForm(url, body){
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body,
    }
    return fetchApi(url, options)
}

export default fetchApi