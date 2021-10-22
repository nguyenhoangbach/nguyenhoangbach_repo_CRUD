export const idReducer = (state = -1, action) => {
    if (action.type === "SETID") {
        return state = action.payload
    }
    return state
}
