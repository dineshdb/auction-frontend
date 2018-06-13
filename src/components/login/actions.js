export function logIn(isLoggedIn){
    return {
        type: "LOGGING",
        payload: isLoggedIn
    }
}