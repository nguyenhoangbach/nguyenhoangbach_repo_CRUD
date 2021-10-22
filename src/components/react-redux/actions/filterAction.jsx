const filterAction = (page) => {
    return {
        type: "SET_FILTER",
        payload: page
    }
}
export default { filterAction }