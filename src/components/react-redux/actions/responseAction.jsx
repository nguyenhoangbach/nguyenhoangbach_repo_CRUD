const responseAction = (payload) => {
    return {
        type: "SET_RESPONSE",
        payload
    }
}

export default { responseAction }