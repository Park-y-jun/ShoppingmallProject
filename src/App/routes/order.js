const express = require("express");
const router = express.Router();
// const errorHandler = require("../../middleware/errorHandler");
const Order = require("../../DB/models/products/Order");
const Delivery = require("../../DB/models/products/Delivery");
const Product = require("../../DB/models/products/Product");
const { findByIdAndUpdate } = require("../../DB/models/products/Order");
//전체 주문 조회
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// 새로운 주문 생성 API
// router.post("/", async (req, res) => {
//   try {
//     const { userId, products } = req.body;

//     const newOrder = new Order({
//       user: userId,
//       products: products.map((product) => ({
//         product: product.productId,
//         quantity: product.quantity,
//         price: product.price,
//       })),
//     });

//     const savedOrder = await newOrder.save();
//     res.status(201).json(savedOrder);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "주문 등록에 실패했습니다." });
//   }
// });

router.post("/", async (req, res) => {
  const { user, product, quantity, price } = req.body;
  try {
    await Order.create({
      user,
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
//////여기 까지만 업데이트 //////
//사용자는 개인 페이지에서 자신의 주문 내역을 조회할 수 있다
// router.get("/user/:id", async (req, res) => {
//   const { id } = req.params;
//   const orders = await Order.find({ user: id });
//   res.json(orders);
// });

// // 배송신청하는 유저의 주문 정보
// router.get("/delivery", async (req, res) => {
//   const { user_id } = req.params;
//   const products = await Product.find({ user_id: user_id, paid: false }); // products들의 paid가 false인 것만 가져오기
//   res.json(products);
// });
// // 주문에서 이어지는 새로운 배송신청
// router.post("/order/delivery", async (req, res) => {
//   const { order, address, contact, demand } = req.body;
//   try {
//     await Delivery.create({
//       order,
//       address,
//       contact,
//       demand,
//     });
//   } catch (e) {
//     res.status(400).json({ message: e.message });
//   }
// });
// // 배송신청한 주문의 상태 변경
// router.put("/order/delivery/:delivery_id", async (req, res) => {
//   const { delivery_id } = req.params;
//   const { paid } = req.body;
//   try {
//     const updateProducts = await findByIdAndUpdate(
//       delivery_id,
//       { paid },
//       { new: true }
//     );
//     res.json(updateProducts);
//   } catch (e) {
//     res.status(400).json({ message: e.message });
//   }
// });

module.exports = router;
