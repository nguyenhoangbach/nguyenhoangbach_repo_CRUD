const isUpdateAction = (payload) => {
    return {
        type: "UPDATE",
        payload
    }
}
export default { isUpdateAction }