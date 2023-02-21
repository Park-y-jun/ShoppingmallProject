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
//login/authentication
const registerRouter = require("./src/App/routes/authentication/register");
const loginRouter = require("./src/App/routes/authentication/login");
const logoutRouter = require("./src/App/routes/authentication/logout");
const authRouter = require("./src/App/routes/authentication/auth");

// 회원, 비회원, 관리자, 판매자

const userProfileRouter = require("./src/App/routes/users/profile");

app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/authPage", authRouter);
app.use("/userProfile", userProfileRouter);

// 8000포트로 서버 실행
app.listen(8000, () => {
  console.log("서버가 8000포트에서 실행중입니다");
});
