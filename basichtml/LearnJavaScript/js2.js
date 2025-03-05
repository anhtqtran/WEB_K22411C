function thucHienPhepToan(a,b,pt)
{
    kq=""
    switch(pt)
    {
        case "+":
            kq=(a+b)
            break
        case "-": 
            kq=(a-b)
            break
        case "*": 
            kq=(a*b)
            break
        case "/":
            kq=(a/b)
            break
        default:
            kq="Phép toán không hợp lệ"
            break
    }
    return kq
}