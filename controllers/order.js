const Order = require("../models/Order");

// create order
const createUserOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const userOrder = await order.save();
    res.status(200).json(userOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update user order
const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete order
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete({ _id: req.params.body });
    res.status(200).json("order has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
};

// get user order
const getUserOrder = async (req, res) => {
  try {
    const userOrder = await Order.findById({ userId: req.user.id });
    res.status(200).json(userOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get monthly income
const getMonthlyIncome = async (req, res) => {
  try {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(
      new Date().setMonth(lastMonth.getMonth() - 1)
    );

    const data = await Order.aggregate([
      {
        $match: { createdAt: { $gte: "$createdAt" } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          totalsSales: { $sum: "#amount" },
        },
      },
    ]);
    res.status(200).json(date);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createUserOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getAllOrders,
  getMonthlyIncome,
};
