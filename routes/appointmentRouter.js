import express from 'express';
import { getAllAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment, getScheduledAppointments } from '../controllers/appointmentController.js';

const appointmentRouter = express.Router();

appointmentRouter
    .route('/')
    .get(getAllAppointments)
    .post(createAppointment);
    
appointmentRouter
    .route('/scheduled')
    .get(getScheduledAppointments)
appointmentRouter
    .route('/:id')
    .get(getAppointmentById)
    .patch(updateAppointment)
    .delete(deleteAppointment);
    
export default appointmentRouter;
