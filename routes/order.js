const router = require("express").Router();
const {
  createUserOrder,
  updateOrder,
  deleteOrder,
  getUserOrder,
  getAllOrders,
  getMonthlyIncome,
} = require("../controllers/order");
const {
  authenticateUser,
  authenticateAdmin,
  verifyToken,
} = require("../middleware/authentication");

router.post("/", verifyToken, createUserOrder);
router.put("/:id", authenticateAdmin, updateOrder);
router.delete("/:id", authenticateAdmin, deleteOrder);
router.get("/:id", authenticateUser, getUserOrder);
router.get("/", authenticateAdmin, getAllOrders);
router.get("/income", authenticateAdmin, getMonthlyIncome);

module.exports = router;
