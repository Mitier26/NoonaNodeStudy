const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoURI = process.env.LOCAL_DB_ADDRESS;

mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => { console.log("몽구스 연결") }).catch((error) => console.log("몽구스 연결 실패 : ", error));

app.listen(process.env.PORT || 5000, () => {
    console.log("서버 온!");
})