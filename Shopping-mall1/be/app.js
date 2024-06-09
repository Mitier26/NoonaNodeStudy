const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

const indexRouter = require("./routes/index");

app.use(cors({
    origin: 'https://noona-mall.netlify.app', // 허용할 도메인
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 허용할 HTTP 메서드
    credentials: true, // 자격 증명 허용
}));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", indexRouter);

const mongoURI = process.env.MONGODB_URI_PROD;

mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => { console.log("몽구스 연결") }).catch((error) => console.log("몽구스 연결 실패 : ", error));

app.listen(process.env.PORT || 5000, () => {
    console.log("서버 온!");
})