const express = require("express");
const router = express.Router();
const tryCatch = require("../utils/tryCatch");
const Order = require("../../DB/models/products/Order");

//전체 주문 조회
router.get(
  "/",
  tryCatch(async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  })
);

//`새로운 주문 생성 API
router.post(
  "/",
  tryCatch(async (req, res) => {
    try {
      const { userId, products } = req.body;

      const newOrder = new Order({
        user: userId,
        products: products.map((product) => ({
          product: product.productId,
          quantity: product.quantity,
          price: product.price,
        })),
      });

      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "주문 등록에 실패했습니다." });
    }
  })
);

module.exports = router;
