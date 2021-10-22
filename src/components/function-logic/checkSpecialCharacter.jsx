
function checkSpecialCharacter (string){
    const regex = /[!#$%^&*(){}]/g;
    let found = string.match(regex)
    if (found !== null)
    {
        console.log(found)
        return true;
    }
    return false;
}

export default checkSpecialCharacter;

// kiểm tra chuỗi nhập vào có kí tự đặc biệt hay không bằng cách
// tìm kiếm trong chuỗi truyền vào có kí tự nào không phải là chữ
// thì gom vào biến found
// nếu biến found rỗng thì trả về fasle và khác rỗng thì true