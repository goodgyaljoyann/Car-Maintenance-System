import pool from '../database/index.js';

export const getAllCustomers = async (_req, res, _next) => {
    try {
        let sqlQuery = `SELECT * FROM customers`;
        const [customers] = await pool.query(sqlQuery);

        res.status(200).json({
            status: 'success',
            results: customers.length,
            data: { customers },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const getCustomerById = async (req, res, _next) => {
    try {
        const customerId = req.params.id;
        let sqlQuery = `SELECT * FROM customers WHERE customer_id = ?`;
        const [customer] = await pool.query(sqlQuery, [customerId]);
        //Error handling to check if there is a record or not
        if (customer.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Customer not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { customer: customer[0] }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const createCustomer = async (req, res, _next) => {
    try {
        const {first_name, last_name, phone, email, password, location_id} = req.body;
        let sqlQuery = `INSERT INTO customers (first_name, last_name, phone, email, password, location_id) VALUES (?, ?, ?, ?, ?, ?)`;
        const result = await pool.query(sqlQuery, [first_name, last_name, phone, email, password, location_id]);

        res.status(201).json({
            status: 'success',
            data: {result}
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const updateCustomer = async (req, res, _next) => {
    try {
        const customerId = req.params.id;
        const {first_name, last_name, phone, email, location_id} = req.body;
        let sqlQuery = `UPDATE customers SET first_name=?, last_name=?, phone=?, email=?, location_id=? WHERE customer_id=?`;
        await pool.query(sqlQuery, [first_name, last_name, phone, email, location_id, customerId]);

        res.status(200).json({
            status: 'success',
            message: 'Customer Info updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const deleteCustomer = async (req, res, _next) => {
    try {
        const customerId = req.params.id;
        let sqlQuery = `DELETE FROM customers WHERE customer_id=?`;
        await pool.query(sqlQuery, [customerId]);

        res.status(200).json({
            status: 'success',
            message: 'Customer deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};
