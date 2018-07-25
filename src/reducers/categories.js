import {CATEGORIES} from "../definitions/index";
export default function categories(state={
    categories: []
},action){
    switch(action.type){
        case CATEGORIES:
            return {...state,categories: [...state.categories,action.payload]}
    }
    return state
}