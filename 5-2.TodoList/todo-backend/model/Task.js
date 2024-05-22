const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema({
    task: {
        type: String,
        required: true
    },
    isComplete: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true });
// 자동으로 생성했을 때 날자를 입력한다.

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;