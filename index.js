const express = require("express");
const app = express();
const registerRouter = require("./src/App/routes/register");

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/userProfile")
  .then(() => {
    console.log("DB연결 성공");
  })
  .catch(() => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/register", registerRouter);

app.listen(8000, () => {
  console.log("서버가 8000포트에서 실행중입니다");
});
