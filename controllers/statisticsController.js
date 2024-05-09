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
