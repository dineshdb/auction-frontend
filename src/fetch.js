import store from './store'

export function fetchApi(path, options){
    let headers = {
        'Authorization': store.getState().user.header,
    }
    options = Object.assign({}, options, {headers, mode: 'cors'})
    return fetch(path, options)
}

export function fetchJSON(path, options){
    return fetchApi(path, options).then(res => {
        return res.json()})
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