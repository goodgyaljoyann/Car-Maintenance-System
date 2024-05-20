import express from 'express';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import multer from 'multer';

const productRouter = express.Router();

// Define storage for the uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/products'); // Specify the directory where uploaded images will be stored
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Set unique filename for each uploaded image
    }
  });
  
  // Create multer instance with the defined storage configuration
  const upload = multer({ storage: storage });


productRouter
    .route('/')
    .get(getAllProducts)
    .post(upload.single('img'), createProduct);
    

productRouter
    .route('/:id')
    .get(getProductById)
    .patch(upload.single('img'),updateProduct)
    .delete(deleteProduct);
    
export default productRouter;
