import {USER_STATUS} from '../../reducers/types'
export function userStatus(data={}){
    return {
        type: USER_STATUS,
        payload: data
    }
}