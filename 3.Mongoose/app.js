const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/mongoose-test');
const validator = require('validator');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                // if (!value.includes('@'))
                //     throw new Error('This is not an Email');
                if (!validator.isEmail(value))
                    throw new Error('This is not an Email');
            }
        }
    },
    password: { type: String, required: true, trim: true },
    age: { type: Number, default: 0 }
})

const User = mongoose.model("User", userSchema);

// const newUser = new User({ name: "김촬쓰", email: "김촬쓰@gmail.com", password: "123", age: 22 });

// newUser.save().then(value => console.log("value is", value));

// User.find().then((value) => console.log("all data", value));
User.find({ name: '홍길동' }).select('name -_id').then((value) => console.log("all data", value));