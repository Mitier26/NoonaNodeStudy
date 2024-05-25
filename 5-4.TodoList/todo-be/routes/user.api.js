const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');

// 화원 가입 엔트 포인트
router.post("/", userController.createUser);

// 로그인 라우터
router.post("/login", userController.loginWithEmail);
// 이메일과 패스워드를 읽어 와야해서 get 같지만 post
// get는 주소창에 보여
// get 는 req.body를 사용할 수 없다.

// 라우터 만들고 수출하는것 필수
module.exports = router;