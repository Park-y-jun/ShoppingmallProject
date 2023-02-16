const express = require("express");
const app = express();
const registerRouter = require("./src/App/routes/register");
const productRouter = require("./src/App/routes/product");
const PORT = 8000;

const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://changhyun:a1s2d3@cluster0.u4mcpe2.mongodb.net/test")
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
app.use("/product", productRouter);

app.listen(PORT, () => {
  console.log("서버가 8000포트에서 실행중입니다");
});
