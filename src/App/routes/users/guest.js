const express = require("express");
const router = express.Router();
const Guest = require("../../../DB/models/user/Guest");
const GuestOrder = require("../../../DB/models/products/GuestOrder");

// 장바구니에서 주문시 게스트 정보를 받아서 저장
router.post("/", async (req, res) => {
  try {
    const { name, email, address } = req.body;
    const guest = await Guest.create({ name, email, address });
    res.json({ guestId: guest._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
// 게스트 주문
router.post("/order", async (req, res) => {
  const { guest, product, quantity, price } = req.body;
  try {
    await GuestOrder.create({
      guest,
      product,
      quantity,
      price,
    });
    // res.redirect("/order/delivery");
    res.status(201).json({ message: "주문이 완료되었습니다." });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// 게스트 주문내역 수정
router.put("/order/:guest", async (req, res) => {
  const { guest } = req.params;
  const { quantity } = req.body;
  try {
    const guestOrder = await GuestOrder.findOneAndUpdate(
      { guest: guest },
      { quantity: quantity }
    );
    if (guestOrder) {
      res.json({
        success: true,
        message: "주문내역이 수정되었습니다.",
      });
    } else {
      res.json({
        success: false,
        message: "주문내역이 없습니다.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// 게스트 주문내역 삭제
router.delete("/order/:guest", async (req, res) => {
  const { guest } = req.params;
  try {
    const guestOrder = await GuestOrder.findOneAndDelete({ guest: guest });
    if (guestOrder) {
      res.json({
        success: true,
        message: "주문내역이 삭제되었습니다.",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
module.exports = router;
