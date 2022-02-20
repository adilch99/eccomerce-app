const router = require("express").Router();
const {
  createUserCart,
  updateCart,
  deleteCart,
  getUserCart,
  getAllCarts,
} = require("../controllers/cart");
const {
  authenticateUser,
  authenticateAdmin,
  verifyToken,
} = require("../middleware/authentication");

router.post("/", verifyToken, createUserCart);
router.put("/:id", authenticateUser, updateCart);
router.delete("/:id", authenticateUser, deleteCart);
router.get("/:id", authenticateUser, getUserCart);
router.get("/", authenticateAdmin, getAllCarts);

module.exports = router;
