const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
// npm i jsonwebtoken
// 토큰을 만들기 위해서 필요한 라이브러리
// 토큰은 유저와 관련이 있어 user model 에 만들었다.

const userSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

}, { timestamps: true });

// toJSON 몽구스에서 제공하는 함수
// 오브젝트가 json으로 변경 될 때 작동하는 함수
// json을 변할 때 작동하니 이것은 항상 작동한다.
userSchema.methods.toJSON = function () {
    const obj = this._doc;
    delete obj.password;        // 패스워드를 제거한다.

    return obj;
}

// 스키마에는 함수를 넣을 수 있다.
userSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, { expiresIn: '1d' });
    // 토큰을 만들 때 id 정보를 넣어 준다. id는 각 데이터의 고유 정보
    // expiresIn: '1d' : 토큰의 유통기한 1day
    return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;