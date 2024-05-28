const { Router } = require('express');
const multer = require('multer');
const ProductController = require('../controllers/ProductController');
const { storage } = require('../config/UploadConfig');
const ProductsRoutes = Router();
const productController = new ProductController();
const ensureAuthentication = require('../middlewares/ensureAuthentication');
const upload = multer({ storage });

ProductsRoutes.post(
  '/create',
  ensureAuthentication,
  upload.single('image'),
  productController.create,
);

ProductsRoutes.put(
  '/update/:id',
  ensureAuthentication,
  productController.update,
);

ProductsRoutes.delete(
  '/delete/:id',
  ensureAuthentication,
  productController.delete,
);

ProductsRoutes.get('/', productController.index);
module.exports = ProductsRoutes;
