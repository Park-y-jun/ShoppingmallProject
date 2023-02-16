const express = require("express");
const Product = require("../../DB/models/products/product");
const User = require("../../DB/models/user");
const router = express.Router();
// 상품 리스트 보이기
router.get("/", (req, res) => {
  res.send("product page");
});
// 상품 상세로 들어가기
router.get("/:index", async (req, res) => {
  const { index } = req.params;
  const product = await Product.findOne({ index });
  res.send("index product 상세 페이지");
});

router.get("/:index/comments", async (req, res) => {
  const { index } = req.params;
  const product = await Product.findOne({ index });
  await User.populate(product.comments, { path: "author" });
  res.json(product.comments);
});

router.post("/:index/comments", async (req, res) => {
  const { index } = req.params;
  const { rate, content } = req.body;
  const author = await User.findOne({ index: req.user.userid });

  // $push operator 사용하여 댓글 추가하기
  await Product.updateOne(
    {
      userid,
    },
    {
      $push: { comments: { rate, content, author } },
    }
  );

  res.json({ result: "success" });
});

module.exports = router;
