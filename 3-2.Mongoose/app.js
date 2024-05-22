const mongoose = require("mongoose");
// 몽구스를 임포트 한다.

mongoose.connect("mongodb://localhost:27017/mongoose-test");
// DB 와 연결한다.

const validator = require("validator");
// 유효성 검사를 위한 외부 라이브러리
// 이메일, 이름의 같음 등을 검사한다.

const { Schema } = mongoose;
// 데이터의 구조를 정의 하는 것은 만든다.

const userSchema = new Schema({
    name: {
        type: String,       // 데이터의 타입
        required: true,     // 데이터가 필수값인지
    },
    email: {
        type: String,
        required: true,
        validate: {         // 검사
            validator: function (value) {
                // 기본적인 확인 방법 . includes를 사용한다.
                // if (!value.includes("@")) {
                //     throw new Error("이메일이 아니다");
                // }
                // 라이브러리를 이용한 방법 isEmail 로 includes를 대체한다.
                if (!validator.isEmail(value)) {
                    throw new Error("이메일이 아니다");
                }
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,    // 공백 제거
    },
    age: {
        type: Number,
        default: 0,
    }
})

const User = mongoose.model("users", userSchema);
// 위에 만들어진 데이터 구조 모델을 이용해 유저을 만든다.

const newUser = new User({ name: "name", email: "aaa@a.com", password: "123", age: 33 });
// 데이터 객체를 만든다.

// newUser.save().then(value => console.log("value : ", value));
// save로 데이터를 저장한다.

User.find({ name: "name" }).select('name -_id').then(value => console.log("all Data", value));