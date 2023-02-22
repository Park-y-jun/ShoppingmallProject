const express = require("express");
const router = express.Router();
const Order = require("../../DB/models/products/order");
const Delivery = require("../../DB/models/products/delivery");

router.get("/order", (req, res) => {
  res.render("order page");
});

router.post("/order", async (req, res) => {
  const { user, products, total } = req.body;
  try {
    await Order.create({
      user,
      products,
      total,
    });
    res.redirect("/order/delivery");
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.get("/order/delivery", (req, res) => {
  res.render("delivery page");
});

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

module.exports = router;
