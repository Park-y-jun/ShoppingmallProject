const express = require("express");
const app = express();
const registerRouter = require("./src/App/routes/register");
const productRouter = require("./src/App/routes/product");
const cartRouter = require("./src/App/routes/cart");
require("dotenv").config();
const PORT = 8000;

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

app.use("/register", registerRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);

app.listen(PORT, () => {
  console.log("서버가 8000포트에서 실행중입니다");
});
