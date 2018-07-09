import {ADD_NEW_USER} from './types'
export default function users(state={
    users: []
},action){
    switch(action.type){
        case ADD_NEW_USER:
            console.log('action dispatched',action.payload,'state',state)
            return {...state,users: [...state.users,action.payload]}
    }
    return state
}