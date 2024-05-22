const Task = require("../model/Task");

const taskController = {}

taskController.createTask = async (req, res) => {
    try {
        // req는 프론트에서 들어온 것
        // req는 head와 body로 이루어져 있는데 body-parser를 이용해 body만 걸러냈다.
        const { task, isComplete } = req.body;
        // body에 있는 것중 task와 isComplete를 끄집어 냈다.

        const newTask = new Task({ task, isComplete });
        // 입력 받은 것을 새로운 Task로 만들고
        await newTask.save();
        // 서버에 저장한다.

        res.status(200).json({ status: '성공', data: newTask });
        // 반환
    } catch (error) {
        res.status(400).json({ status: '실패', error: error });
    }

};

taskController.getTask = async (req, res) => {
    try {
        const taskList = await Task.find({}).select("-__v");
        res.status(200).json({ status: "성공", data: taskList });
    } catch (error) {
        res.status(400).json({ status: '실패', error: error });
    }
}

taskController.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            throw new Error("찾을 수 없다.");
        }
        const fields = Object.keys(req.body);
        fields.map((item) => (task[item] = req.body[item]));
        await task.save();
        res.status(200).json({ status: "성공", data: task });
    } catch (error) {
        res.status(400).json({ status: "실패", error });
    }
};

taskController.deleteTask = async (req, res) => {
    try {
        const deleteItem = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: "성공", data: deleteItem });
    } catch (error) {
        res.status(400).json({ status: "실패", error });
    }
};

module.exports = taskController;