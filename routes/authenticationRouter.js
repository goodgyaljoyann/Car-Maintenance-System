import express from 'express';
import { loginUser, registerUser, updatePassword, updateUserInfo } from '../controllers/AuthenticationController.js';

const authenticationRouter = express.Router();

authenticationRouter
    .route('/login')
    .post(loginUser);

authenticationRouter
    .route('/register')
    .post(registerUser);


authenticationRouter
    .route('/update-password/:id')
    .patch(updatePassword);

    authenticationRouter
    .route('/update-user/:id')
    .patch(updateUserInfo);

// authenticationRouter
//     .route('/logout/:id')
//     .post(logoutUser);


export default authenticationRouter;
