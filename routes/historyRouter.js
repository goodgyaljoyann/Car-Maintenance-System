import express from 'express';
import { getAppointmentsByCustomerId } from '../controllers/historyController.js';

const router = express.Router();

router.get('/:id', getAppointmentsByCustomerId);

export default router;
