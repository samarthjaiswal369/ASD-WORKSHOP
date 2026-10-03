const productService = require("../services/productService");

async function getProducts(req, res, next) {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
}

async function getProductById(req, res, next) {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function createProduct(req, res, next) {
  try {
    const { name, price } = req.body;
    if (typeof name !== "string" || !name.trim() || !Number.isFinite(Number(price))) {
      return res.status(400).json({ error: "A non-empty name and numeric price are required" });
    }
    const product = await productService.createProduct({ name: name.trim(), price: Number(price) });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
}

async function replaceProduct(req, res, next) {
  try {
    const { name, price } = req.body;
    if (typeof name !== "string" || !name.trim() || !Number.isFinite(Number(price))) {
      return res.status(400).json({ error: "A non-empty name and numeric price are required" });
    }
    const product = await productService.replaceProduct(req.params.id, {
      name: name.trim(), price: Number(price)
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function updateProduct(req, res, next) {
  try {
    const updates = {};
    if (req.body.name !== undefined) {
      if (typeof req.body.name !== "string" || !req.body.name.trim()) {
        return res.status(400).json({ error: "Name must be a non-empty string" });
      }
      updates.name = req.body.name.trim();
    }
    if (req.body.price !== undefined) {
      if (!Number.isFinite(Number(req.body.price))) {
        return res.status(400).json({ error: "Price must be numeric" });
      }
      updates.price = Number(req.body.price);
    }
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "Provide name and/or price to update" });
    }
    const product = await productService.updateProduct(req.params.id, updates);
    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (error) {
    next(error);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const deleted = await productService.deleteProduct(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully", product: deleted });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  replaceProduct,
  updateProduct,
  deleteProduct
};
