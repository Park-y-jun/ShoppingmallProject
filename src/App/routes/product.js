const express = require("express");
const Product = require("../../DB/models/products/product");
const router = express.Router();
// 상품 리스트 보이기
router.get("/product", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.get("/product/:product_id", async (req, res) => {
  const { product_id } = req.params;
  try {
    const product = await Product.findOne({ product_id: product_id });
    if (!product) {
      res.status(400).json({ message: "상품이 없습니다." });
    } else {
      res.json(product);
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
