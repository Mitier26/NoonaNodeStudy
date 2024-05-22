const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = Schema({
    //스키마 정의
    task: {
        type: String,
        required: true
    },
    isComplete: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })

// 스키마를 이용해 모델을 만듬
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;