const express = require("express");
const router = express.Router();
const taskApi = require('./task.api');
const userApi = require("./user.api");

router.use("/tasks", taskApi);
// /tasks주소로 들어오면 taskApi를 실행한다.
router.use("/user", userApi);

module.exports = router;