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


// // Function to logout user
// export const logoutUser = async (req, res) => {
//     // Clear the token from local storage
//     localStorage.removeItem('authToken');
//     res.status(200).json({ message: 'Logout successful' });
// };

//Admins