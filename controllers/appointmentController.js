import pool from '../database/index.js';

// Function to get all appointments
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await pool.query('SELECT * FROM appointments');
        res.status(200).json({ status: 'success', data: appointments[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Function to get appointment by ID
export const getAppointmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await pool.query('SELECT * FROM appointments WHERE appointment_id = ?', [id]);
        if (appointment[0].length === 0) {
            return res.status(404).json({ status: 'error', message: 'Appointment not found' });
        }
        res.status(200).json({ status: 'success', data: appointment[0][0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Function to get scheduled appointments ordered by date
export const getScheduledAppointments = async (req, res) => {
    try {
        // Query to select appointments with appt_status 'scheduled' and order them by date
        const appointments = await pool.query('SELECT * FROM appointments WHERE appt_status = ? ORDER BY date', ['scheduled']);
        res.status(200).json({ status: 'success', info: appointments[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// // Function to create a new appointment
// export const createAppointment = async (req, res) => {
//     // Extract customer ID from cookie
//     const customerId = req.cookies.customerId;

//     const { service_id, date, time, payment_status, appt_status } = req.body;

//     try {
//         await pool.query('INSERT INTO appointments (customer_id, service_id, date, time, payment_status, appt_status) VALUES (?, ?, ?, ?, ?, ?)',
//             [customerId, service_id, date, time, payment_status, appt_status]);
//         res.status(201).json({ status: 'success', message: 'Appointment created successfully' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: 'error', message: 'Internal server error' });
//     }
// };

// Function to create a new appointment
export const createAppointment = async (req, res) => {
    const { customer_id, service_id, date, time, make, model, year, mechanic_note, payment_status, appt_status } = req.body;

    try {
        await pool.query('INSERT INTO appointments (customer_id, service_id, date, time, make, model, year, mechanic_note, payment_status, appt_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [customer_id, service_id, date, time, make, model, year, mechanic_note, payment_status, appt_status]);
        res.status(201).json({ status: 'success', message: 'Appointment created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};


// Function to update an existing appointment
export const updateAppointment = async (req, res) => {
    const apptId = req.params.id;
    const { customer_id, service_id, date, time, make, model, year, mechanic_note, payment_status, appt_status } = req.body;

    try {
        await pool.query('UPDATE appointments SET customer_id = ?, service_id = ?, date = ?, time = ?, make = ?, model = ?, year = ?, mechanic_note, payment_status = ?, appt_status = ? WHERE appointment_id = ?',
            [customer_id, service_id, date, time,  make, model, year, mechanic_note, payment_status, appt_status, apptId]);
        res.status(200).json({ status: 'success', message: 'Appointment updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Function to delete an appointment
export const deleteAppointment = async (req, res) => {
    const { id } = req.body;

    try {
        await pool.query('DELETE FROM appointments WHERE appointment_id = ?', [id]);
        res.status(200).json({ status: 'success', message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
