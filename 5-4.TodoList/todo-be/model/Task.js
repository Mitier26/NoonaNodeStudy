const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 데이터의 구조를 정의 한다.
const taskSchema = Schema({
    task: {
        type: String,
        required: true,
    },
    isComplete: {
        type: Boolean,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"  // 위에 있는 스크마가 누구를 참조하냐/
    }
}, { timestamps: true })

// Task라는 이름으로 스키마 구조를 이용해 모델을 만든다.
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;