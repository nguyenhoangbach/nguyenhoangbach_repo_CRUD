function CheckIllegalEmail(string) {
    const regex = /[@]/g;
    let found = string.match(regex)
    if (found === null || string.startsWith('@') || string.endsWith('@')) {
        return false;
    }
    return true;
}



export default CheckIllegalEmail;

/*kiểm tra 1 trong các điều kiện sau
- chuỗi có @ hay không               => nếu sai thì trả về fasle
- chuỗi có bắt đầu bằng @ hay không  => nếu sai trả về false
- chuỗi có kết thúc bằng @ hay không => nếu sai trả về false
- nếu cả 3 điều kiện cùng đúng thì trả về true
*/