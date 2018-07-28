import store from './store'

function fetchApi(path, options){
    let headers = {
        'Authorization': state.getState().user.header,
    }
    options = Object.assign({}, options, {headers,})
    return fetch(path, options)
}

export default fetchApi