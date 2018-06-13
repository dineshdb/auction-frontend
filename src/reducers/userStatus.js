export default function userStatus(state={
    loggedIn: false
    }, action){
    switch(action.type){
        case "LOGGING": {
            return {...state,loggedIn: action.payload}

        }

    }
    return state
}



