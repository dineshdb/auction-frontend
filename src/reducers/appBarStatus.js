export default function appBarStatus(state={
    logInClicked: false,
    searchClicked: false,
    signUpClicked: false
    }, action){
    switch(action.type){
        case "LOG_IN_CLICKED": {
            return {...state,logInClicked: action.payload}
                }
        case "SEARCH_CLICKED":{
            return {...state,searchClicked: action.payload}
        }
        case "SIGNUP_CLICKED":{
            return {...state,signUpClicked: action.payload}
        }




    }
    return state
}



