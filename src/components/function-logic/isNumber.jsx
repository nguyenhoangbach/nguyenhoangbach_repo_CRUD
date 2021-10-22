function IsNumber(num) {
    if (!Number.isInteger(num / 1)) {
        // kiểm tra nếu num không phải số nguyên thì trả về false
        return false
    }
    return true;
}
export default IsNumber;
// kiểm tra chuỗi truyền vào có là số nguyên hay không
// nếu không phải thì trả về false
// parseINt
// string
// 