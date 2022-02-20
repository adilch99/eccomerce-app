const User = require("../models/User");
const bcrypt = require("bcrypt");

// update user
const updateUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { password: hashedPassword },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    res.status(200).json("deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

// get single user
const getUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all user
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get users stats
const getUsersStats = async (req, res) => {
  try {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: { month: { $month: "$updatedAt" } },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUsersStats,
};
