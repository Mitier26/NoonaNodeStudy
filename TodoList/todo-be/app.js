const express = require('express');
// 백앤드 필수 요소 express, node.js 를 위한 프레임워크, 웹 서버 개발을 쉽게!
// express 를 이용해 app 을 만든다.
// 특정 port로 들어 오면 작동된다.
// get, post, delete, put
const mongoose = require('mongoose');
// 몽구스 DB를 사용하기 위해 필요한 것
const bodyParser = require('body-parser');
// response에 있는 body 부분을 추출하기 위한것, 없어도 되지만 있으면 편하다.

// express는 화면에 있는 주소 부분을 하는 것이고
// mongoose는 서버에 저장되어 있는 것이다.
// router와 서버에 연결하는 것는 만들 었지만.
// 서로 연결되어 있지는 않다.
const indexRouter = require("./routes/index");

const app = express();
// express로 app을 만든다.
app.use(bodyParser.json());
// app에 bodyParser를 사용하겠다라는 것으로 다른 것도 추가 할 수 있다.

app.use("/api", indexRouter);

// 몽고db에 연결을 해 준다.
// MongoDBCompass에 입력되 주소 27017 까지 + db 이름
// 없으면 todo-demo 라는 것이 생성된다.
const mongoURI = 'mongodb://localhost:27017/todo-demo'

//연결하기
// 여기에 있는 mongoose 에 주소에 있는 것을 연결!!
mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => {
    console.log("몽구스 연결 성공");
}).catch((error) => {
    console.log("몽구스 연결 실패 :", error);
});

// app는 localhost 5000 번으로 들어 오는 것은 여기에서 작동한다.
app.listen(5000, () => {
    console.log("서버 5000 번!");
});