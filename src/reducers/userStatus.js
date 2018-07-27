import {USER_STATUS} from './types'
export default function userStatus(state={

        isOnline: false
    
},action){
    switch(action.type){
        case USER_STATUS:
            console.log("USER",state)
            return {...state,isOnline: action.payload.isOnline}
    }
    return state
}