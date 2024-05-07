import express from 'express';
import { getAllPayments, getPaymentById, createPayment, updatePayment, deletePayment } from '../controllers/paymentController.js';

const paymentRouter = express.Router();

paymentRouter
    .route('/')
    .get(getAllPayments)
    .post(createPayment);
    

paymentRouter
    .route('/:id')
    .get(getPaymentById)
    .patch(updatePayment)
    .delete(deletePayment);
    
export default paymentRouter;
