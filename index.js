require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors({ origin: "http://localhost:3000" }));

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB연결 성공");
  })
  .catch(() => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("hello");
});
//라우터
const registerRouter = require("./src/App/routes/register");
const loginRouter = require("./src/App/routes/login");

app.use("/user/register", registerRouter);
app.use("/user/login", loginRouter);
// 8000포트로 서버 실행
app.listen(8000, () => {
  console.log("서버가 8000포트에서 실행중입니다");
});
