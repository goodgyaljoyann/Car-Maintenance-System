import express from 'express';
import { getAllAdmins, getAdminById, createAdmin, updateAdmin, deleteAdmin} from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter
    .route('/')
    .get(getAllAdmins)
    .post(createAdmin);
    

adminRouter
    .route('/:id')
    .get(getAdminById)
    .patch(updateAdmin)
    .delete(deleteAdmin);

export default adminRouter;