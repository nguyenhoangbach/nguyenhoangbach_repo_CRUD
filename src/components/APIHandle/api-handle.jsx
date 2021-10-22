function isEmpty(obj) {
    if (Object.keys(obj).length === 0) {
        return false;
    }
    return true;
}


async function handleDataApi(url = "", params, data = {}) {
    let data1 = {
        method: params.method,
        more: "cors",
        cache: "no-cache",
        headers: params.headers,
        redirect: "follow",
        referrerPolicy: "no-referrer",
    }
    let data2 = {}
    if (!isEmpty(data)) {
        data2 = { ...data1 };
    }
    else {
        data2 = { body: JSON.stringify(data), ...data1 }
    }
    const response = await fetch(url, data2)
    return response.json()
}
export default handleDataApi


