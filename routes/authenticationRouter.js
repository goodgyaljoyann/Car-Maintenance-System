import express from 'express';
import { loginAdmin, loginUser, registerAdmin, registerUser, updatePassword, updateUserInfo, updateAdminPassword, updateAdminInfo } from '../controllers/AuthenticationController.js';

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

authenticationRouter
    .route('/login-admin')
    .post(loginAdmin);

authenticationRouter
    .route('/register-admin')
    .post(registerAdmin);

authenticationRouter
    .route('/update-password-admin/:id')
    .patch(updateAdminPassword);

authenticationRouter
    .route('/update-admin/:id')
    .patch(updateAdminInfo);




export default authenticationRouter;
