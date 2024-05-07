import express from 'express';
import { getAllCustomers, getCustomerById, createCustomer, updateCustomer, deleteCustomer } from '../controllers/customerController.js';

const customerRouter = express.Router();

customerRouter
    .route('/')
    .get(getAllCustomers)
    .post(createCustomer);
    

customerRouter
    .route('/:id')
    .get(getCustomerById)
    .patch(updateCustomer)
    .delete(deleteCustomer);
    
export default customerRouter;
