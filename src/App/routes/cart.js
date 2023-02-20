// const express = require("express");
// const router = express.Router();
// const Product = require("../../DB/models/products/product");
// // const Option = require("../../DB/models/products/option");
// // const Cart = require("../../DB/models/cart/cart");

// let cart = [];

// router.get("/", (req, res) => {
//   res.status(200).json(cart);
// });

// router.post("/add", (req, res) => {
//   const { productId, options } = req.body;
//   const product = Product.find((product) => product.id === productId);
//   const selectedOption = product.options.find((option) => {
//     option.name === options;
//   });
//   const existingProductIndex = cart.findOne((item) => {
//     item.id === productId && item.options === options;
//   });
//   if (existingProductIndex) {
//     cart[existingProductIndex].count += 1;
//   } else {
//     cart.push({
//       product_id: productId,
//       count: 1,
//       price: selectedOption.price,
//     });
//   }
//   res.status(200).json({ message: "Product added to cart" });
// });

// module.exports = router;
