const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (req.headers.token) {
    const token = req.headers.token.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SEC);
    req.user = user;
    next();
  } else {
    res.status(400).json({ msg: "invalid token" });
  }
};

const authenticateUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("access denied");
    }
  });
  res.status(200);
};

const authenticateAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("access denied");
    }
  });
  res.status(200);
};

module.exports = {
  authenticateUser,
  authenticateAdmin,
  verifyToken,
};
