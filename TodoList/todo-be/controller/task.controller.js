const Task = require("../model/task");

const taskController = {}

// req 는 프론트에서 받와 백앤드로 보내는 것
// res 는 백앤드에서 나와 프론트로 보내는 것
taskController.createTask = async (req, res) => {
    try {
        // 프론트에서 객체의 형태로 req로 보낸다.
        // 헤더와 바디로 구성되어 있느 body-parser 를 이용해 body만 가지고 온다.
        const { task, isComplete } = req.body;
        const newTask = new Task({ task, isComplete });
        await newTask.save();

        res.status(200).json({ status: '생성 성공', data: newTask });
    } catch (error) {
        res.status(400).json({ status: "생성 실패", error: error })
    }

};

taskController.getTask = async (req, res) => {
    try {
        const taskList = await Task.find({});
        res.status(200).json({ status: "가져오기 성공", data: taskList });
    } catch (error) {
        res.status(400).json({ status: "가져오기 실패", error: error });
    }
};

module.exports = taskController;