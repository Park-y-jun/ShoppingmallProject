const express = require("express");
const Product = require("../../DB/models/products/Product");
const router = express.Router();
const tryCatch = require("../utils/tryCatch");

// 상품 리스트 보이기
router.get(
  "/",
  tryCatch(async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  })
);

router.get(
  "/:product_id",
  tryCatch(async (req, res) => {
    const { product_id } = req.params;
    try {
      const product = await Product.findOne({ product_id: product_id });
      res.status(200).json(product);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  })
);

module.exports = router;
