export const responseReducer = (state = [], action) => {
    if (action.type === "SET_RESPONSE") {
        return state = action.payload
    }
    return state
}