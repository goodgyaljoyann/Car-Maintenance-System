import pool from '../database/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret';

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
