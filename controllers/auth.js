const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//  register

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const isEmailExist = await User.findOne({ email });
    const isUsernameExist = await User.findOne({ username });

    if (isEmailExist || isUsernameExist) {
      return res.status(400).json({ msg: "already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    res.status(201).json({ savedUser });
  } catch (err) {
    res.status(500).json(err);
  }
};

//  login

const login = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    const isPassOk = await bcrypt.compare(req.body.password, user.password);
    if (!isPassOk) {
      return res.status(400).json({ msg: "wrong password" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  register,
  login,
};
