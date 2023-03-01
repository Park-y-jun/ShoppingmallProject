require("dotenv").config();

const express = require("express");

const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000"],
    credentials: true,
  })
);

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
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/authPage", authRouter);

// 회원, 비회원, 관리자, 판매자

const userProfileRouter = require("./src/App/routes/users/profile");

const adminRouter = require("./src/App/routes/admin");

const guestRouter = require("./src/App/routes/users/guest");

app.use("/userProfile", userProfileRouter);
app.use("/admin", adminRouter);
app.use("/guest", guestRouter);

//제품
const productRouter = require("./src/App/routes/product");
app.use("/product", productRouter);

//주문
const orderRouter = require("./src/App/routes/order");
//app.use("/user/:user_id", orderRouter);
app.use("/order", orderRouter);

// 5000포트로 서버 실행
server.listen(process.env.PORT, () => {
  console.log(`서버가 ${process.env.PORT}포트에서 실행중입니다`);
});
