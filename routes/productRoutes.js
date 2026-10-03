const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const cacheMiddleware = require("../middleware/cacheMiddleware");
const invalidateCache = require("../middleware/invalidateCache");

router.get("/", cacheMiddleware, productController.getProducts);
router.get("/:id", cacheMiddleware, productController.getProductById);

router.post("/", invalidateCache, productController.createProduct);
router.put("/:id", invalidateCache, productController.replaceProduct);
router.patch("/:id", invalidateCache, productController.updateProduct);
router.delete("/:id", invalidateCache, productController.deleteProduct);

module.exports = router;
