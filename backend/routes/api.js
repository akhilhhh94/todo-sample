var express = require("express");
var authRouter = require("./auth");
var todoRouter = require("./todo");
var todoDataRouter = require("./todoData");


var app = express();

app.use("/auth/", authRouter);
app.use("/todo/", todoRouter);
app.use("/todo-data/", todoDataRouter);

module.exports = app;
