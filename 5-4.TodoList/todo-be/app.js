const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// 라우터를 가지고 온다.
const indexRouter = require("./routes/index");

const app = express();
app.use(bodyParser.json());

// 주소 앞에 /api라고 붙으면 indexRouter가 작동된다.
app.use("/api", indexRouter);
// /api -> index -> tasks -> router

const mongoURI = "mongodb://localhost:27017/todo-demo";

// 연결
mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => {
    console.log("몽구스 연결");
}).catch((error) => {
    console.log("DB 연결 실패", error);
});

// 5000 번으로 들어오면 작동한다.
app.listen(5000, () => {
    console.log("서버 5000번");
});