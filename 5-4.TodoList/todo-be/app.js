const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// 라우터를 가지고 온다.
const indexRouter = require("./routes/index");

const cors = require("cors");

const app = express();

require('dotenv').config();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

app.use(bodyParser.json());

app.use(cors());

// 주소 앞에 /api라고 붙으면 indexRouter가 작동된다.
app.use("/api", indexRouter);
// /api -> index -> tasks -> router

// 이것은 로컬 주소, Altass 를 이용하면서 필요없어졌다.
const mongoURI = "mongodb://localhost:27017/todo-demo";
// env를 사용해야하는데 이것은 설치해 주어야한다 npm i dotenv
// const mongoURI = MONGODB_URI_PROD;

// 연결
mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => {
    console.log("몽구스 연결");
}).catch((error) => {
    console.log("DB 연결 실패", error);
});

// 5000 번으로 들어오면 작동한다.
app.listen(process.env.PORT || 5000, () => {
    console.log("server on 5000");
})