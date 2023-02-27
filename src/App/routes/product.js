const express = require("express");
const Product = require("../../DB/models/products/Product");
const router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
// 상품 리스트 보이기
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.get("/:product_id", async (req, res) => {
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
