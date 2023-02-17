const express = require("express");
const Product = require("../../DB/models/products/product");
const User = require("../../DB/models/user");
const router = express.Router();
// 상품 리스트 보이기
router.get("/", (req, res) => {
  res.send("product page");
});
// 상품 상세로 들어가기
router.get("/:id", async (req, res) => {
  console.log(req);
  const { id } = req.params;
  console.log(id);
  const product = await Product.findOne({ id });
  res.send(product);
});

router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ id });
  await User.populate(product.comments, { path: "author" });
  res.json(product.comments);
});

// router.post("/:id/comments", async (req, res) => {
//   const { id } = req.params;
//   const { rate, content } = req.body;
//   const author = await User.findOne({ id: req.user.id });

//   // $push operator 사용하여 댓글 추가하기
//   await Product.updateOne(
//     {
//       id,
//     },
//     {
//       $push: { comments: { rate, content, author } },
//     }
//   );

//   res.json({ result: "success" });
// });

module.exports = router;
