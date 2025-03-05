const express = require("express");
const app = express();
const port = 3000;
const morgan=require("morgan");
app.use(morgan("combined"))

// Tạo API mặc định
app.get("/", (req, res) => {
    res.send("Chào bạn tới với dịch vụ của tui");
});

// Lắng nghe trên cổng 3000
app.listen(port, () => {
    console.log(`Server của tui đang chạy trên cổng ${port}`);
});

//hehe haha
//Bài 113,137 – Tạo HTTP GET – List of Book
const cors=require("cors")
app.use(cors())
let database=[
    {"BookId":"b1","BookName":"Kỹ thuật lập trình cơ bản","Price":70,"Image":"b1.png"},
    {"BookId":"b2","BookName":"Kỹ thuật lập trình nâng cao","Price":100,"Image":"b2.png"},
    {"BookId":"b3","BookName":"Máy học cơ bản","Price":200,"Image":"b3.png"},
    {"BookId":"b4","BookName":"Máy học nâng cao","Price":300,"Image":"b4.png"},
    {"BookId":"b5","BookName":"Lập trình Robot cơ bản","Price":250,"Image":"b5.png"},
    ]
    app.get("/books",cors(),(req,res)=>{
    res.send(database)
    })
    app.get("/books/:id",cors(),(req,res)=>{
    id=req.params["id"]
    let p=database.find(x=>x.BookId==id)
    res.send(p)
    })
    