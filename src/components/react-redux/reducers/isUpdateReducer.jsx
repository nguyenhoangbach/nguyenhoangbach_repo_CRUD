const isUpdateReducer = (state = false, action) => {
    if (action.type === "UPDATE") {
        return state = action.payload
    }
    return state
}
export { isUpdateReducer }