const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require('dotenv').config();
const cors = require('cors');

const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api", indexRouter);

// const mongoURI = 'mongodb://localhost:27017/todo-demo2';
const mongoURI = MONGODB_URI_PROD;

mongoose.connect(mongoURI, { useNewUrlParser: true }).then(() => {
    console.log("mongoose connected");
}).catch((error) => {
    console.log("DB connection fail", error);
});

app.listen(process.env.PORT || 5000, () => {
    console.log("server on 5000");
})