function LimitStringInput (string){
   if(string.length > 30)
   {
    return true
   }
   return false;
}
export default LimitStringInput;

// hàm này kiểm tra độ dài của input 
// nếu độ dài vượt quá 30 kí tự thì trả về true
// nếu không vượt quá 30 kí tự thì trả về false