import express from 'express';
import { getAllMessages, getLastMessageByCustomerId, getLastAppointmentIdByCustomer, createMessage, updateMessageReply, deleteMessage} from '../controllers/messagesController.js';

const messageRouter = express.Router();

messageRouter
    .route('/')
    .get(getAllMessages)
    .post(createMessage)
messageRouter
    .route('/last-message/:customer_id')
    .get(getLastMessageByCustomerId)
messageRouter
    .route('/reply/:message_id')
    .patch(updateMessageReply)

messageRouter
    .route('/last-appointment/:id')
    .patch(getLastAppointmentIdByCustomer)
messageRouter
    .route('/:id')
    .delete(deleteMessage);

export default messageRouter;