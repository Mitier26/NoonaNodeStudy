const express = require('express');
const taskController = require('../controller/task.controller');
const router = express.Router();

router.post('/', taskController.createTask);

router.get('/', taskController.getTask);

router.put('/:id', (req, res) => {
    res.send("목록 변경");
});

router.delete('/:id', (req, res) => {
    res.send("목록 삭제");
})

module.exports = router;