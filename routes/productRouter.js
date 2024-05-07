import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter
    .route('/')
    .get(getAllProducts)
    .post(createProduct);
    

productRouter
    .route('/:id')
    .get(getProductById)
    .patch(updateProduct)
    .delete(deleteProduct);
    
export default productRouter;
