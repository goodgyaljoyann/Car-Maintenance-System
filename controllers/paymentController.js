import pool from '../database/index.js';

// Function to get all payments
export const getAllPayments = async (req, res) => {
    try {
        const payments = await pool.query('SELECT * FROM payments');
        res.status(200).json({ status: 'success', data: payments[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Function to get payment by ID
export const getPaymentById = async (req, res) => {
    const { id } = req.params;

    try {
        const payment = await pool.query('SELECT * FROM payments WHERE payment_id = ?', [id]);
        if (payment[0].length === 0) {
            return res.status(404).json({ status: 'error', message: 'Payment not found' });
        }
        res.status(200).json({ status: 'success', data: payment[0][0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Function to create a new payment
export const createPayment = async (req, res) => {
    const { appointment_id, amount } = req.body;
    const payment_date = new Date(); // Current date and time

    try {
        await pool.query('INSERT INTO payments (appointment_id, amount, payment_date) VALUES (?, ?, ?)',
            [appointment_id, amount, payment_date]);
        res.status(201).json({ status: 'success', message: 'Payment created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Function to update an existing payment
export const updatePayment = async (req, res) => {
    const { id } = req.params;
    const { amount} = req.body;
    const payment_date = new Date(); // Current date and time

    try {
        await pool.query('UPDATE payments SET amount = ?, payment_date = ? WHERE payment_id = ?',
            [amount, payment_date, id]);
        res.status(200).json({ status: 'success', message: 'Payment updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Function to delete a payment
export const deletePayment = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM payments WHERE payment_id = ?', [id]);
        res.status(200).json({ status: 'success', message: 'Payment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
