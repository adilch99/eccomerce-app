const Cart = require("../models/Cart");

// create order
const createUserCart = async (req, res) => {
  try {
    const order = new Cart(req.body);
    const userOrder = await order.save();
    res.status(200).json(userOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update user cart
const updateCart = async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete cart
const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete({ _id: req.params.body });
    res.status(200).json("Cart has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};

// get user cart
const getUserCart = async (req, res) => {
  try {
    const userCart = await Cart.findById({ userId: req.user.id });
    res.status(200).json(userCart);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all carts
const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find({});
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createUserCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCarts,
};
