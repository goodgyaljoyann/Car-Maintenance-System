import express from 'express';
import { getServices, getAppointments, getCustomers } from '../controllers/statisticsController.js';

const statisticsRouter = express.Router();

statisticsRouter.get('/services', async (req, res) => {
    try {
        const serviceCount = await getServices();
        res.json({ serviceCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

statisticsRouter.get('/appointments', async (req, res) => {
    try {
        const activeAppointmentCount = await getAppointments();
        res.json({ activeAppointmentCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


statisticsRouter.get('/customers', async (req, res) => {
    try {
        const customerCount = await getCustomers();
        res.json({ customerCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default statisticsRouter;
