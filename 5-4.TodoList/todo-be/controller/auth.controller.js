const authController = {};
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = (req, res, next) => {
    try {
        const tokenString = req.headers.authorization;
        if (!tokenString) {
            throw new Error("토큰이 없다.");
        }

        // Bearer 를 잘라!
        const token = tokenString.replace("Bearer ", "");
        jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
            // 암호키도 넣어 주어야한다.
            if (error) {
                throw new Error("복호화가 잘못 되었다");
            }
            //res.status(200).json({ status: "복호성공", userId: payload._id });
            req.userId = payload._id;       // req에 payload를 추가한다.
        });
        next(); // <--- 다음 것을 해라. 미들웨어
    } catch (error) {
        res.status(400).json({ status: "유저 토큰 실패", message: error.message });
    }
}

module.exports = authController;

// 미들 웨어!!!!!!!!!!!!!!!!!!!!!!!!!!!!
