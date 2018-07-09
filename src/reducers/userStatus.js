import {USER_STATUS} from './types'
export default function userStatus(state={
        id: "",
        isOnline: false
    
},action){
    switch(action.type){
        case USER_STATUS:
            console.log('action dispatched',action.payload,'state',state)
            console.log("NEW ",{...state,id: action.payload.id,isOnline: action.payload.isOnline})
            return {...state,id: action.payload.id,isOnline: action.payload.isOnline}
    }
    console.log("NEW STATE",state)
    return state
}