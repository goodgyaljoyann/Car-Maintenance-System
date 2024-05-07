import express from 'express';
import { getAllServices, getServiceById, createService, updateService, deleteService } from '../controllers/serviceController.js';

const serviceRouter = express.Router();

serviceRouter
    .route('/')
    .get(getAllServices)
    .post(createService);
    

serviceRouter
    .route('/:id')
    .get(getServiceById)
    .patch(updateService)
    .delete(deleteService);
    
export default serviceRouter;
