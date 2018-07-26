import {USER_PRODUCTS} from "../definitions/index";
export default function userProducts(state={
    products: []
},action){
    switch(action.type){
        case USER_PRODUCTS:
            return {...state,products: [...state.products,action.payload]}
    }
    return state
}