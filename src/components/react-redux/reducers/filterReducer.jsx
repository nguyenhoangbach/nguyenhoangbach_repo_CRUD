export const filterReducer = (state = { page: 1 }, action) => {
    if (action.type === "SET_FILTER") {
        return state = action.payload
    }
    return state
}