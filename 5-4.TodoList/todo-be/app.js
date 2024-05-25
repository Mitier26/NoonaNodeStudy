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
// const mongoURI = "mongodb://localhost:27017/todo-demo";
// env를 사용해야하는데 이것은 설치해 주어야한다 npm i dotenv
const mongoURI = MONGODB_URI_PROD;

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

// 1. 회원가입 만들기
// 유저 이메일, 패스워드, 유저이름
// 회원 정보를 저장해야함 (데이터베이스 모델 필요)
// 패스워드는 암호화

// 라우터 : 프론트에게 어디로 보내 겠다는 것을 만듬
// 데이터 모델을 만듬
// 데이터를 저장 (패스워드 암호화, 가입여부 확인)
// 응답 보냄

// 2. 로그인
// 이메일, 패스워드를 보냄
// DB에 해당 email이 있고 password가 동일 한지 확인
// 로그인이 성공하면!! 유저 정보 + 토큰
// 토큰 로그인히 성공했다는 정보로 다시 로그인 하는 번거러움을 막아 준다.
// 프론트에서 유저정보와 토큰을 저장!

// 할 것
// 라우터 만들기
// 이메일, 패스워드 정보 가지고 오기
// 이메일을 가지고 유저정보 가지고 옴
// 있다면 유저정보 패스워드와 프론트의 입력 패스워드가 비교
// 맞으면 유저정보 + 토큰