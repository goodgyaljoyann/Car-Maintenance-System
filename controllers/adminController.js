import pool from '../database/index.js';

export const getAllAdmins = async (_req, res, _next) => {
    try {
        let sqlQuery = `SELECT * FROM admins`;
        const [admins] = await pool.query(sqlQuery);

        res.status(200).json({
            status: 'success',
            results: admins.length,
            data: { admins },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const getAdminById = async (req, res, _next) => {
    try {
        const adminId = req.params.id;
        let sqlQuery = `SELECT * FROM admins WHERE admin_id = ?`;
        const [admin] = await pool.query(sqlQuery, [adminId]);
        //Error handling to check if there is a record or not
        if (admin.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Admin not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { admin: admin[0] }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const createAdmin = async (req, res, _next) => {
    try {
        const {f_name, l_name, email, password} = req.body;
        let sqlQuery = `INSERT INTO admins (f_name, l_name, email, password) VALUES (?, ?, ?, ?)`;
        const result = await pool.query(sqlQuery, [f_name, l_name, email, password]);

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

export const updateAdmin = async (req, res, _next) => {
    try {
        const adminId = req.params.id;
        const {f_name, l_name, email, password} = req.body;
        let sqlQuery = `UPDATE admins SET f_name=?, l_name=?, email=?, password=? WHERE admin_id=?`;
        await pool.query(sqlQuery, [f_name, l_name, email, password, adminId]);

        res.status(200).json({
            status: 'success',
            message: 'Admin Info updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const deleteAdmin = async (req, res, _next) => {
    try {
        const adminId = req.params.id;
        let sqlQuery = `DELETE FROM admins WHERE admin_id=?`;
        await pool.query(sqlQuery, [adminId]);

        res.status(200).json({
            status: 'success',
            message: 'Admin deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};
