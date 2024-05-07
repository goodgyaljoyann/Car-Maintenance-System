import express from 'express';
import { getAllLocations, getLocationById, createLocation, updateLocation, deleteLocation } from '../controllers/locationController.js';

const locationRouter = express.Router();

locationRouter
    .route('/')
    .get(getAllLocations)
    .post(createLocation);
    

locationRouter
    .route('/:id')
    .get(getLocationById)
    .patch(updateLocation)
    .delete(deleteLocation);
    
export default locationRouter;
