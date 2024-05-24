import express from 'express';
import { getAllAppointments, getAppointmentById, createAppointment, updateAppointment, deleteAppointment, getScheduledAppointments,  getLastAppointmentIdByCustomer  } from '../controllers/AppointmentController.js';


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

// Add route for fetching last appointment ID by customer
appointmentRouter.get('/last/:customer_id', async (req, res) => {
    const { customer_id } = req.params;
    try {
        const appointmentId = await getLastAppointmentIdByCustomer(customer_id);
        if (!appointmentId) {
            return res.status(404).json({ status: 'error', message: 'No appointment found' });
        }
        res.status(200).json({ status: 'success', appointment_id: appointmentId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});


  

export default appointmentRouter;
