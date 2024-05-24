import express from 'express';
import {checkAvailability} from '../controllers/checkAvailabilityController.js';

const checkAvailabilityRouter = express.Router();

checkAvailabilityRouter
    .route('/')
    .get(checkAvailability);

export default checkAvailabilityRouter;