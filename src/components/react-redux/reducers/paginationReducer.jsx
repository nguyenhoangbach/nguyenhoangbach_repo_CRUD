export const paginationReducer = (state = {}, action) => {
    if (action.type === "SET_PAGINATION") {
        return state = action.payload
    }
    return state
}