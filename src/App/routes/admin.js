const express = require("express");

const multer = require("multer");
const path = require("path");
const router = express.Router();
const Product = require("../../DB/models/products/Product");
const Category = require("../../DB/models/products/Category");
const Order = require("../../DB/models/products/Order");
const tryCatch = require("../utils/tryCatch");

// 리스트 가져오기
router.get(
  "/product",
  tryCatch(async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
  })
);

// 상품 조회
router.get(
  "/product/:product_id",
  tryCatch(async (req, res) => {
    try {
      const product = await Product.findOne({
        product_id: req.params.product_id,
      });
      if (!product) {
        res.status(404).json({ message: "상품이 없습니다." });
      }
      const base64Image = Buffer.from(product.image.data).toString("base64");

      res.status(200).json({
        id: product._id,
        name: product.name,
        image: {
          data: base64Image,
          contentType: product.image.contentType,
        },
        description: product.description,
        price: product.price,
        category: product.category,
      });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  })
);

// 이미지 업로드 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

// 업로드 미들웨어
const upload = multer({ storage: storage });

//상품 등록
router.post(
  "/product",
  upload.single("image"),
  tryCatch(async (req, res) => {
    const { name, description, price, category } = req.body;
    const product = new Product({
      name,
      description,
      price,
      category,
      image: req.file.filename,
    });
    await product.save();
    if (!product) {
      return res.status(500).send("상품을 저장할 수 없습니다.");
    } else {
      res.send(product);
    }
  })
);

//상품 수정
router.put(
  "/product/:product_id",
  upload.single("image"),
  tryCatch(async (req, res) => {
    const { name, description, price, category } = req.body;
    const product_id = req.params.product_id;
    const imagePath = req.file ? `/images/${req.file.filename}` : null;
    try {
      const product = await Product.findByIdAndUpdate(
        product_id,
        {
          name,
          description,
          price,
          category,
          image: imagePath,
        },
        { new: true }
      );
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "서버 에러" });
    }
  })
);

router.post(
  "/product/:product_id",
  upload.single("image"),
  tryCatch(async (req, res) => {
    const { name, description, price, category } = req.body;

    try {
      // 업데이트할 제품 찾기
      const product = await Product.findOne({
        product_id: req.params.product_id,
      });

      // 이미지가 업로드된 경우 처리
      if (req.file) {
        product.image.data = req.file.buffer;
        product.image.contentType = req.file.mimetype;
      }

      // 제품 정보 업데이트
      product.name = name;
      product.description = description;
      product.price = price;
      product.category = category;

      // 제품 정보 저장
      await product.save();

      // 업데이트된 제품 반환
      res.json(product);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  })
);

// 상품삭제
router.delete(
  "/product/:product_id",
  tryCatch(async (req, res) => {
    const { product_id } = req.params;
    await Product.deleteOne({ product_id: product_id });
    res.send("OK");
  })
);
router.get(
  "/product",
  tryCatch(async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  })
);

//카테고리 리스트 조회
router.get(
  "/category",
  tryCatch(async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  })
);

//카테고리 추가
router.post(
  "/category",
  tryCatch(async (req, res) => {
    try {
      const category = new Category({
        category: req.body.category,
      });
      await category.save();
      res.status(200).json({ message: "카테고리가 추가되었습니다." });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  })
);

//카테고리 수정
router.post(
  "/category/:category",
  tryCatch(async (req, res) => {
    const { category } = req.params;
    const name = req.body.category;
    try {
      const updateCategory = await Category.findOne({
        category: category,
      });
      updateCategory.category = name;
      await updateCategory.save();
      // res.send(updateCategory);
      res.status(200).json({ message: "카테고리가 수정되었습니다." });
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  })
);

//카테고리 삭제
router.delete(
  "/category/:category",
  tryCatch(async (req, res) => {
    const { category } = req.params;
    await Category.deleteOne({ category: category });
    res.send("DELETE");
  })
);

// 관리자 주문 조회

router.get(
  "/order",
  tryCatch(async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  })
);

module.exports = router;
