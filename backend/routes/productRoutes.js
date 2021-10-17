import express from 'express';
import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import {getProducts, getProductById , addProduct}  from '../controllers/productController.js';
import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route('/').get(getProducts).post(protect , admin , addProduct)

 router.route('/:id').get(getProductById);

export default router;