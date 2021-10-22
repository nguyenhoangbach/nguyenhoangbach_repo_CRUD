
import { combineReducers } from "redux";

export const currentUser = (state = {}, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                loggedIn: true
            }
        case "LOG_OUT":
            return {
                ...state,
                user: {},
                loggedIn: false
            }
        default: return state
    }
}



export const counterReducer = (state = 1, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state + 1
        case "DECREMENT":
            return state - 1
        default: return state
    }
}



export const rootReducer = combineReducers({
    currentUser,
    counterReducer
})


// rootCReducer nó sẽ trông như thế này:

const rootsReducer = (state = { curentUser: {}, counterReducer: 1 }, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                ...state,
                counterReducer: counterReducer + 1
            }
        case "DECREMENT":
            return {
                ...state,
                counterReducer: counterReducer - 1
            }
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                loggedIn: true
            }
        case "LOG_OUT":
            return {
                ...state,
                user: {},
                loggedIn: false
            }
        default: return state
    }
}

