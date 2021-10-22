export const counterReducer = (state = 1, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state + 1
        case "DECREMENT":
            return state - 1
        default: return state
    }
}
// xây dựng 1 cái reducer cho công việc quản lí counter
