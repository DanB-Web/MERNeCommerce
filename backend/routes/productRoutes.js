import express from 'express';
const router = express.Router();

import { getProducts, getProductById } from '../controllers/productController.js';

//Fetch all products, GET /api/products
router.get('/', getProducts);
//Alternate syntax
//router.route('/').get(getProducts)

//Fetch single product, GET /api/products/id
router.get('/:id', getProductById);

export default router;

