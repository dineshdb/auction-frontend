import store from './store'

function fetchApi(path, options){
    let headers = {
        'Authorization': store.getState().user.header,
    }
    options = Object.assign({}, options, {headers, mode: 'cors'})
    return fetch(path, options)
}

export default fetchApi