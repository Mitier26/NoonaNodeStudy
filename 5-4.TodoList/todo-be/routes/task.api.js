const express = require("express");
const taskController = require("../controller/task.controller");
const authController = require("../controller/auth.controller");
const router = express.Router();

router.post('/', authController.authenticate, taskController.createTask);

router.get('/', taskController.getTask);
// 유저를 검색하고 Task를 작동한다.

router.put('/:id', taskController.updateTask)

router.delete('/:id', taskController.deleteTask)

module.exports = router;