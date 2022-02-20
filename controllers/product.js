const Product = require("../models/Product");

// create product
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const newProduct = await product.save();

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

// get single product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById({ _id: req.params.id });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all products
const getProducts = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  let products;

  try {
    if (qNew) {
      console.log("dfasdf");
      products = await Product.find({}).sort({ createdAt: -1 });
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find({});
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
};
