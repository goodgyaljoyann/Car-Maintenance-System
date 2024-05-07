import express from 'express';
import { loginUser, registerUser } from '../controllers/authenticationController.js';

const authenticationRouter = express.Router();

authenticationRouter
    .route('/login')
    .post(loginUser);

authenticationRouter
    .route('/register')
    .post(registerUser);

// authenticationRouter
//     .route('/update/:id')
//     .patch(updateUser);

export default authenticationRouter;
