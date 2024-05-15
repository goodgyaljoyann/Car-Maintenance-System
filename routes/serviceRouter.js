import express from 'express';
import { getAllServices, getServiceById, createService, updateService, deleteService } from '../controllers/serviceController.js';
import multer from 'multer';

const serviceRouter = express.Router();

// Define storage for the uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/services'); // Specify the directory where uploaded images will be stored
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Set unique filename for each uploaded image
    }
  });
  
  // Create multer instance with the defined storage configuration
  const upload = multer({ storage: storage });
  

serviceRouter
    .route('/')
    .get(getAllServices)
    .post(upload.single('img'), createService);
    

serviceRouter
    .route('/:id')
    .get(getServiceById)
    .patch(upload.single('img'), updateService)
    .delete(deleteService);

    
export default serviceRouter;
