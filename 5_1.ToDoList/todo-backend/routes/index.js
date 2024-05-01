const express = require('express');
const router = express.Router();
const taskApi = require('./task.api');

router.use('/tasks', taskApi);
// url주소의 요청이 [tasks] 로 오면  taskApi를 실행한다.
// 버그
module.exports = router;