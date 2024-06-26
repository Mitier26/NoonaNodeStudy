const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authController = {};

authController.loginWithEmail = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = await user.generateToken();
                return res.status(200).json({ status: "로그인 성공", user, token });
            }
        }
        throw new Error("이메일 또는 비밀번호가 잘못되었습니다");
    } catch (error) {
        res.status(400).json({ status: "로그인 실패", error: error.message });
    }
}

authController.authenticate = async (req, res, next) => {
    try {
        const tokenString = req.headers.authorization;
        if (!tokenString) throw new Error("토큰을 찾을 수 없다.");

        const token = tokenString.replace("Bearer ", "");
        jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
            if (error) throw new Error("유효하지 않는 토큰");
            req.userId = payload._id;
        });
        next();
    } catch (error) {
        res.status(400).json({ status: "토큰실패", error: error.message });
    }
}

authController.checkAdminPermission = async (req, res, next) => {
    try {
        const { userId } = req;

        const user = await User.findById(userId);

        if (user.level !== "admin") throw new Error("어드민 아님");

        next();

    } catch (error) {
        res.status(400).json({ status: "어드민 체크 실패", error: error.message });
    }
}

module.exports = authController;