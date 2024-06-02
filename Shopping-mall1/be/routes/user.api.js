const express = require("express");
const userController = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");
const router = express.Router();

// 회원가입
router.post("/", userController.createUser);

// 토큰 보냄
// 토큰이 정상인지 확인, 토큰으로 유저를 찾는다.
router.get("/me", authController.authenticate, userController.getUser);

module.exports = router;