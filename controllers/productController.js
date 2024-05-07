import pool from '../database/index.js';

// Function to get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await pool.query('SELECT * FROM products');
        res.status(200).json({ status: 'success', data: products[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Function to get product by ID
export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await pool.query('SELECT * FROM products WHERE product_id = ?', [id]);
        if (product[0].length === 0) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }
        res.status(200).json({ status: 'success', data: product[0][0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Function to create a new product
export const createProduct = async (req, res) => {
    const { product_name, description, price, img } = req.body;

    try {
        await pool.query('INSERT INTO products (product_name, description, price, img) VALUES (?, ?, ?, ?)',
            [product_name, description, price, img]);
        res.status(201).json({ status: 'success', message: 'Product created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Function to update an existing product
export const updateProduct = async (req, res) => {
    const productId = req.params.id;
    const { product_name, description, price, img } = req.body;

    try {
        await pool.query('UPDATE products SET product_name = ?, description = ?, price = ?, img = ? WHERE product_id = ?',
            [product_name, description, price, img, productId]);
        res.status(200).json({ status: 'success', message: 'Product updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Function to delete a product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM products WHERE product_id = ?', [id]);
        res.status(200).json({ status: 'success', message: 'Product deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
