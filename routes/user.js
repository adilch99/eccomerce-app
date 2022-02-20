const router = require("express").Router();
const {
  updateUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUsersStats,
} = require("../controllers/user");
const {
  authenticateUser,
  authenticateAdmin,
} = require("../middleware/authentication");

router.put("/:id", authenticateUser, updateUser);
router.delete("/:id", authenticateUser, deleteUser);
router.get("/find/:id", authenticateAdmin, getUser);
router.get("/", authenticateAdmin, getAllUsers);
router.get("/stats", authenticateAdmin, getUsersStats);

module.exports = router;
