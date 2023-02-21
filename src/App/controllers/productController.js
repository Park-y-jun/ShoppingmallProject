// const Product = require("../../DB/models/products/Product");
// const createProduct = async (req, res) => {
//   const { name, description, price, option, category } = req.body;
//   try {
//     if (!name || !description || !price) {
//       res.status(400).json({ message: "필수항목을 전부 작성하세요." });
//     }
//     const product = new Product({
//       name,
//       description,
//       price,
//       option,
//       category,
//     });
//     await product.save();
//     //res.redirect(`/product/${product.id}`);
//   } catch (e) {
//     res.status(400).json({ message: e.message });
//   }
// };

// module.exports = { createProduct };
