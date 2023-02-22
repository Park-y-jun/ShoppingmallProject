const express = require("express");
const router = express.Router();
const Product = require("../../DB/models/products/product");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// 리스트 가져오기
router.get("/product", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// 상품 상세
router.get("/product/:product_id", async (req, res) => {
  const { product_id } = req.params;
  try {
    const product = await Product.findOne({
      category: category,
      product_id: product_id,
    });
    if (!product) {
      res.status(400).json({ message: "상품이 없습니다." });
    } else {
      res.json(product);
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// 상품 등록
router.post("/product", async (req, res) => {
  const { name, description, price, option, category } = req.body;
  try {
    if (!name || !description || !price) {
      res.status(400).json({ message: "필수항목을 전부 작성하세요." });
    }
    const product = await Product.create({
      name,
      description,
      price,
      option,
      category,
    });
    res.json(product);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// 상품 수정
router.post("/product/:product_id", async (req, res) => {
  const { product_id } = req.params;
  const { name, description, price, option } = req.body;
  try {
    if (!name || !description || !price) {
      res.status(400).json({ message: "필수항목을 전부 작성하세요." });
    }
    await Product.updateOne(
      { category: category, product_id: product_id },
      {
        name,
        description,
        price,
        option,
      }
    );
    res.redirect(`/product/${product_id}`);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// 상품삭제
router.delete("/product/:product_id", async (req, res) => {
  const { product_id } = req.params;
  await Product.deleteOne({ product_id: product_id });
  res.send("OK");
});

module.exports = router;
