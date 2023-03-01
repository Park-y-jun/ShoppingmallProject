const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const router = express.Router();
const Product = require("../../DB/models/products/Product");
const Category = require("../../DB/models/products/Category");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// 이미지 업로드
const storage = multer.memoryStorage();

// 업로드 파일 필터링
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("이미지 파일만 올리세요"), false);
  }
};

// 업로드 미들웨어
const upload = multer({ storage: storage, fileFilter: fileFilter });

// 리스트 가져오기
router.get("/product", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// 상품 조회
router.get("/product/:product_id", async (req, res) => {
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
});

//상품 등록
router.post("/product", upload.single("image"), async (req, res) => {
  try {
    const image = req.file;
    console.log(image);
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: {
        data: image.buffer,
        contentType: image.mimetype,
      },
    });
    await product.save();
    res.status(200).json({ message: "상품이 등록되었습니다." });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

//상품 수정
router.post(
  "/product/:product_id",
  upload.single("image"),
  async (req, res) => {
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
  }
);

router.post(
  "/product/:product_id",
  upload.single("image"),
  async (req, res) => {
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
  }
);

// 상품삭제
router.delete("/product/:product_id", async (req, res) => {
  const { product_id } = req.params;
  await Product.deleteOne({ product_id: product_id });
  res.send("OK");
});
router.get("/product", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

//카테고리 리스트 조회
router.get("/category", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

//카테고리 추가
router.post("/category", async (req, res) => {
  try {
    const category = new Category({
      category: req.body.category,
    });
    await category.save();
    res.status(200).json({ message: "카테고리가 추가되었습니다." });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

//카테고리 수정
router.post("/category/:category", async (req, res) => {
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
});

//카테고리 삭제
router.delete("/category/:category", async (req, res) => {
  const { category } = req.params;
  await Category.deleteOne({ category: category });
  res.send("DELETE");
});

module.exports = router;
