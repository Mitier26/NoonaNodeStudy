const User = require("../models/User");
const bcrypt = require("bcryptjs");

const userController = {}

userController.createUser = async (req, res) => {
    try {
        let { email, password, name, level } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            throw new Error("이미 가입된 이메일 입니다.");
        }

        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        const newUser = new User({ email, password, name, level: level ? level : "customer" });
        await newUser.save();

        return res.status(200).json({ status: '가입 성공' });

    } catch (error) {
        res.status(400).json({ status: "실패", error: error.message });
    }
}

userController.getUser = async (req, res) => {
    try {
        const { userId } = req;
        const user = await User.findById(userId);
        if (user) {
            res.status(200).json({ status: "토큰으로 찾기 성공", user });
        }
        throw new Error("유효하지 않는 토큰");
    } catch (error) {
        res.status(400).json({ status: "유저 없음", error: error.message });
    }
}

module.exports = userController;