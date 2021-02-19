import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
const router = express.Router();

//Fetch all products, GET /api/products
router.get('/', asyncHandler (async (_, res) => {

    const products = await Product.find({});
    res.send(products);
  })
);

//Fetch single product, GET /api/products/id
router.get('/:id', asyncHandler (async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      //Message will go to the custom error handler middleware
      throw new Error('Product not found');
    }
  })
);

export default router;

