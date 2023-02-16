const User = require("../../DB/models/user");

const createUser = async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      phone: req.body.phone,
    });
    await user.save();
    res.status(200).send({ success: true, msg: "createuser successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, msg: error.message });
  }
};

module.exports = { createUser };
