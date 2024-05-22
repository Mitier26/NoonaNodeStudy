const express = require("express");
const router = express.Router();
const taskApi = require('./task.api');

router.use("/tasks", taskApi);
// /tasks주소로 들어오면 taskApi를 실행한다.
// router.use("/users", userApi);

module.exports = router;