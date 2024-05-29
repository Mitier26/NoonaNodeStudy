const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const authController = require('../controller/auth.controller');

// 화원 가입 엔트 포인트
router.post("/", userController.createUser);

// 로그인 라우터
router.post("/login", userController.loginWithEmail);
// 이메일과 패스워드를 읽어 와야해서 get 같지만 post
// get는 주소창에 보여
// get 는 req.body를 사용할 수 없다.


// 토큰을 토해 유저 id를 뺀다 => id로 유저를 찾는다.
router.get("/me", authController.authenticate, userController.getUser);
// 함수를 1개가 아닌 여러개를 넣을 수 있다.
// userController.getUser <---next에 영향을 주는 것
// next 가 실행되면 userController.getUser 이것을 작동한다.

// 라우터 만들고 수출하는것 필수
module.exports = router;