import {ADD_NEW_USER} from '../../reducers/types'

export function addUser(data={}){
    return {
        type: ADD_NEW_USER,
        payload: data

    }
}
