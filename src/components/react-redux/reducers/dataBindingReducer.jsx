export const dataBindingReducer = (state = { name: "", email: "", gender: "", status: "" }, action) => {
    if (action.type === "SET_DATA_BINDING") {
        return state = action.payload
    }
    return state
}