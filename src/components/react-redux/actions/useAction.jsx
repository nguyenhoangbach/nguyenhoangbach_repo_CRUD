const setUser = (userObj) => {
    return {
        type: "SET_USER",
        payload: userObj
    }
}


const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}
export default {
    setUser, logOut
}

// tương tự tạo nên 2 action 