import {CATEGORIES} from "../../definitions/index";

export function categoriesAction(categories=[]){
    return ({
        type: CATEGORIES,
        payload: categories
    })
}