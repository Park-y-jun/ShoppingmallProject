const express = require("express");
const router = express.Router();
const errorHandler = require("../../middleware/errorHandler");
const Order = require("../../DB/models/products/order");
const Delivery = require("../../DB/models/products/delivery");
const Product = require("../../DB/models/products/product");
const { findByIdAndUpdate } = require("../../DB/models/products/order");
//전체 주문 조회
router.get("/order", (req, res) => {
  res.render("order page");
});
// 새 주문
router.post("/order", async (req, res) => {
  const { user, product, quantity, price } = req.body;
  try {
    await Order.create({
      user,
      product,
      quantity,
      price,
    });
    res.redirect("/order/delivery");
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
// 배송신청하는 유저의 주문 정보
router.get("/order/delivery", async (req, res) => {
  const { user_id } = req.params;
  const products = await Product.find({ user_id: user_id });
  res.json(products);
});
// 주문에서 이어지는 새로운 배송신청
router.post("/order/delivery", async (req, res) => {
  const { order, address, contact, demand } = req.body;
  try {
    await Delivery.create({
      order,
      address,
      contact,
      demand,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});
// 배송신청한 주문의 상태 변경
router.put("/order/delivery/:delivery_id", async (req, res) => {
  const { delivery_id } = req.params;
  const { paid } = req.body;
  try {
    const updateProducts = await findByIdAndUpdate(
      delivery_id,
      { paid: true },
      { new: true }
    );
    res.json(updateProducts);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;
