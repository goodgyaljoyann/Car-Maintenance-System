import pool from '../database/index.js';

export const getAppointmentsByCustomerId = async (req, res) => {
    const { id } = req.params;

    try {
        const appointments = await pool.query('SELECT * FROM appointments WHERE customer_id = ?', [id]);
        if (appointments[0].length === 0) {
            return res.status(404).json({ status: 'error', message: 'No appointments found for this customer' });
        }
        res.status(200).json({ status: 'success', data: appointments[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};