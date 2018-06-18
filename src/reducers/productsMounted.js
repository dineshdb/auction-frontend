export default function mountedProducts(state={
   index: 0
    }, action){
    switch(action.type){
       case "PRODUCT_MOUNTED":
        return {...state,index: this.index+4}




    }
    return state
}



