import store from './store'

function fetchApi(path, options){
    let headers = {
        'Authorization': store.getState().user.header,
    }
    options = Object.assign({}, options, {headers, mode: 'cors'})
    return fetch(path, options)
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