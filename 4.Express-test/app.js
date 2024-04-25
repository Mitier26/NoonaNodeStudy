const express = require('express');

const app = express();

// 라우팅
// app.get("/", (req, res) => {
//     res.send("hello molkang world");
// })

// app.get("/about", (req, res) => {
//     res.send("this is all about express");
// })

// app.post('about', () => {
//     res.send("Post Post!!")
// })

// 미들웨어
// 중간에서 권한이 있는지 확인 하는 녀석
// next 가 미들웨어
const token = null;

const checkAuth = (req, res, next) => {
    console.log("she has admin permission");
    next();
}

const checkToken = (req, res, next) => {
    if (token) {
        console.log("You have Token");
        next();
    }
    res.send("you dont have token");

}

const getUser = (req, res) => {
    console.log("here is user info");
    res.send('here is user info');
}

// 미들웨어는 여러개 동시에 사용할 수 있다.
app.get("/users", checkAuth, checkToken, getUser)

// 연결하기, 포트 번호 50000
app.listen(5000, () => {
    console.log('server is on 5000');
})