import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import adminRouter from './routes/adminRouter.js';
import appointmentRouter from './routes/appointmentRouter.js';
import authenticationRouter from './routes/authenticationRouter.js';
import serviceRouter from './routes/serviceRouter.js';
import customerRouter from './routes/customerRouter.js';
import locationRouter from './routes/locationRouter.js';
import paymentRouter from './routes/paymentRouter.js';
import productRouter from './routes/productRouter.js';
import statisticsRouter from './routes/statisticsRouter.js';
import checkAvailabilityRouter from './routes/checkAvailabilityRouter.js';
import authenticateToken from './authMiddleware/authenticateToken.js';
import historyRouter from './routes/historyRouter.js';
import messageRouter from './routes/messagesRouter.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

// Serve static files from the 'uploads' directory
app.use('/uploads/services', express.static(join(__dirname, 'uploads', 'services')));
app.use('/uploads/products', express.static(join(__dirname, 'uploads', 'products')));

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:4200', // Allow requests from this origin
  optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));

// Setup JSON Body Parsing & URLEncoding
app.use(express.json({ limit: '1kb' }));
app.use(express.urlencoded({ extended: true, limit: '1kb' }));

if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

// Routes
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/appointments', appointmentRouter);
app.use('/api/v1/authentication', authenticationRouter);
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/history', historyRouter);
app.use('/api/v1/locations', locationRouter);
app.use('/api/v1/payments', paymentRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/services', serviceRouter);
app.use('/api/v1/statistics', statisticsRouter);
app.use('/api/v1/check-availability', checkAvailabilityRouter);
app.use('/api/v1/messages', messageRouter);
//Protected Routes
app.use('/payments', authenticateToken, paymentRouter);
app.use('/appointments', authenticateToken, appointmentRouter);
app.use('/history', authenticateToken, historyRouter);
app.use('/messages', authenticateToken, messageRouter);
app.use('/view-customer', authenticateToken, customerRouter);
app.use('/edit-info/:id', authenticateToken, customerRouter);


const port = process.env.PORT || 2400; // Added default port if process.env.PORT is not defined
const server = app.listen(port, () => console.log(`Listening on http://localhost:${port}`));


export default server; // Exporting server for potential future use
