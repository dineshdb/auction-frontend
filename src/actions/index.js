export const selectUser = (user) => {
    console.log("clicked")
    return {
        type: "USER_SELECTED",
        payload: user
    }

}
