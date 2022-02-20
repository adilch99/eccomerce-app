const router = require("express").Router();
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getProduct,
  getProducts,
} = require("../controllers/product");
const {
  authenticateUser,
  authenticateAdmin,
} = require("../middleware/authentication");

router.post("/", authenticateAdmin, createProduct);
router.delete("/:id", authenticateAdmin, deleteProduct);
router.put("/:id", authenticateAdmin, updateProduct);
router.get("/:id", getProduct);
router.get("/", getProducts);

module.exports = router;
