const User = require("../model/User");
// 암호화를 위한 라이브러리 npm i bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;      // 몇 번 암호화 하는 가

const userController = {}

// 회원가입용
userController.createUser = async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const user = await User.findOne({ email });
        // 입력된 email를 기준으로 DB에 있의면 user에 저장한다.
        // user에 값이 있어 true 이면 가입이 되어 있는 유저

        if (user) {
            throw new Error("이미 가입이 된 유저!");
        }

        const salt = bcrypt.genSaltSync(saltRounds);
        // 암화화 횟수를 가지고 소금을 만든다.
        const hash = bcrypt.hashSync(password, salt);
        // 소금을 가지고 입력 받은 패스워드를 암호화 한다.

        const newUser = new User({ email, name, password: hash });
        // 패스워드는 암호하한 hash를 입력한다.

        await newUser.save();

        res.status(200).json({ status: "성공" });

    } catch (error) {
        res.status(400).json({ status: "회원 가입 실패", error });
    }
}

// 로그인용
userController.loginWithEmail = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }, "-createdAt -updatedAt -__v");
        // 유저가 있으면 비교
        if (user) {
            // 주의!! DB에 있는 패스워드는 암호하 되어 있다.
            const isMath = bcrypt.compareSync(password, user.password);
            if (isMath) {
                const token = user.generateToken();
                // 성공하면 유저정보와 토큰을 보낸다.
                return res.status(200).json({ status: "성공", user, token });
            }
        }
        throw new Error("아이디 또는 비밀번호가 일치하지 않습니다.");
    } catch (error) {
        res.status(400).json({ status: "로그인 실패", message: error.message });
    }
}

module.exports = userController;