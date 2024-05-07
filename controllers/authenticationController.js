import pool from '../database/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'pass-code2001';

// Function to handle user registration
export const registerUser = async (req, res) => {
    const { first_name, last_name, phone, email, password, location_id } = req.body;

    try {
        // Check if the user already exists
        const userExists = await pool.query('SELECT * FROM customers WHERE email = ?', [email]);
        if (userExists[0].length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user data into the database
        await pool.query('INSERT INTO customers (first_name, last_name, phone, email, password, location_id) VALUES (?, ?, ?, ?, ?, ?)',
            [first_name, last_name, phone, email, hashedPassword, location_id]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to handle user login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await pool.query('SELECT * FROM customers WHERE email = ?', [email]);
        if (user[0].length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(password, user[0][0].password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create and assign a token
        const token = jwt.sign({ id: user[0][0].customer_id }, JWT_SECRET);
        res.header('auth-token', token).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to update user password
export const updatePassword = async (req, res) => {
    const { newPassword } = req.body;
    const customerId = req.params.id; // Extract customer_id from request params

    try {
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password in the database
        await pool.query('UPDATE customers SET password = ? WHERE customer_id = ?', [hashedPassword, customerId]);

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to update user information
export const updateUserInfo = async (req, res) => {
    const { first_name, last_name, phone, email } = req.body;
    const customerId = req.params.id; // Extract customer_id from request params

    try {
        // Update the user's information in the database
        await pool.query('UPDATE customers SET first_name = ?, last_name = ?, phone = ?, email = ? WHERE customer_id = ?', 
            [first_name, last_name, phone, email, customerId]);

        res.status(200).json({ message: 'User information updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//ADMINS

// Function to handle admin registration
export const registerAdmin = async (req, res) => {
    const { f_name, l_name, email, password } = req.body;

    try {
        // Check if the admin already exists
        const adminExists = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
        if (adminExists[0].length > 0) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert admin data into the database
        await pool.query('INSERT INTO admins (f_name, l_name, email, password) VALUES (?, ?, ?, ?)',
            [f_name, l_name, email, hashedPassword]);

        res.status(201).json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Function to handle admin login
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the admin exists
        const admin = await pool.query('SELECT * FROM admins WHERE email = ?', [email]);
        if (admin[0].length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(password, admin[0][0].password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create and assign a token
        const token = jwt.sign({ id: admin[0][0].admin_id }, JWT_SECRET);
        res.header('auth-token', token).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to update admin password
export const updateAdminPassword = async (req, res) => {
    const { newPassword } = req.body;
    const adminId = req.params.id; // Extract admin_id from request params

    try {
        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the admin's password in the database
        await pool.query('UPDATE admins SET password = ? WHERE admin_id = ?', [hashedPassword, adminId]);

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Function to update admin information
export const updateAdminInfo = async (req, res) => {
    const { f_name, l_name, email } = req.body;
    const adminId = req.params.id; // Extract admin_id from request params

    try {
        // Update the admin's information in the database
        await pool.query('UPDATE admins SET f_name = ?, l_name = ?, email = ? WHERE admin_id = ?', 
            [f_name, l_name, email, adminId]);

        res.status(200).json({ message: 'Admin information updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// // Function to logout user
// export const logoutUser = async (req, res) => {
//     // Clear the token from local storage
//     localStorage.removeItem('authToken');
//     res.status(200).json({ message: 'Logout successful' });
// };

//Admins