// In your appointmentsController.js
import pool from '../database/index.js';

export const checkAvailability = async (req, res) => {
    const { date, time } = req.query;

    try {
        const [result] = await pool.query(
            'SELECT COUNT(*) as count FROM appointments WHERE date = ? AND time = ?',
            [date, time]
        );

        const count = result[0].count;
        const isAvailable = count < 3;

        res.status(200).json({ status: 'success', data: { isAvailable } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
