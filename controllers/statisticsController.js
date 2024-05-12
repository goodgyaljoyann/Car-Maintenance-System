import pool from '../database/index.js';

// Function to get the count of booked services
export const getServices = async () => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS serviceCount FROM services');
        return result[0][0].serviceCount;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Function to get the count of active appointments
export const getAppointments = async () => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS activeAppointmentCount FROM appointments WHERE appt_status = ?', ['scheduled']);
        return result[0][0].activeAppointmentCount;
    } catch (error) {
        console.error(error);
        throw error;
    }
};


// Function to get the count of products bought
export const getCustomers = async () => {
    try {
        const result = await pool.query('SELECT COUNT(*) AS customerCount FROM customers');
        return result[0][0].customerCount;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Function to get daily revenue from payments
export const getDailyRevenue = async () => {
    try {
        const dailyRevenue = await pool.query(`
            SELECT DATE(payment_date) AS date, SUM(amount) AS revenue
            FROM payments
            GROUP BY DATE(payment_date)
        `);
        return { status: 'success', data: dailyRevenue[0] }; // Return the result
    } catch (error) {
        console.error(error);
        throw new Error('Internal server error'); // Throw error to be caught by caller
    }
};

