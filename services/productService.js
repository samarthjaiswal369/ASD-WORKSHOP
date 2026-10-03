const productDatabase = require("../database/productDatabase");

const getAllProducts = () => productDatabase.getAll();
const getProductById = (id) => productDatabase.getById(id);
const createProduct = (product) => productDatabase.create(product);
const replaceProduct = (id, product) => productDatabase.replace(id, product);
const updateProduct = (id, updates) => productDatabase.update(id, updates);
const deleteProduct = (id) => productDatabase.remove(id);

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  replaceProduct,
  updateProduct,
  deleteProduct
};
