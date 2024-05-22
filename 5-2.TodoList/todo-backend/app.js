const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const cors = require('cors');
// 필요한 것을 가지고 온다.

const app = express();
app.use(bodyParser.json());
app.use(cors());
// app에 bodyParser를 사용하겠다는 것이다.
app.use("/api", indexRouter);
// 주소 앞에 api라는 것이 있으면 indexRouter를 실행한다.

const mongoURI = `mongodb://localhost:27017/todo-demo`;

mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => {
    console.log("mongoose connected");
}).catch((err) => {
    console.log("DB connection fail", err);
});
// URI와 연결을 한다.
// 최신으 주소형태에서도 잘 작동되게 한다.

app.listen(5000, () => {
    console.log("server on 5000");
})
// 포트 번호 5000 번의 요청이 들어 오면 실행한다.


// 라우터 주소 정의
