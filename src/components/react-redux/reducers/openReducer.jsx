export const openReducer = (state = false, action) => {
    switch (action.type) {
        case "OPEN":
            return state = !state;
        default: return state
    }
}