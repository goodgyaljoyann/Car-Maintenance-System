import pool from '../database/index.js';

// Function to get all locations
export const getAllLocations = async (req, res) => {
    try {
        const locations = await pool.query('SELECT * FROM locations');
        res.status(200).json({ status: 'success', data: locations[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Function to get location by ID
export const getLocationById = async (req, res) => {
    const { id } = req.params;

    try {
        const location = await pool.query('SELECT * FROM locations WHERE location_id = ?', [id]);
        if (location[0].length === 0) {
            return res.status(404).json({ status: 'error', message: 'Location not found' });
        }
        res.status(200).json({ status: 'success', data: location[0][0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Function to create a new location
export const createLocation = async (req, res) => {
    const { location_name, parish } = req.body;

    try {
        await pool.query('INSERT INTO locations (location_name, parish) VALUES (?, ?)',
            [location_name, parish]);
        res.status(201).json({ status: 'success', message: 'Location created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Function to update an existing location
export const updateLocation = async (req, res) => {
    const { id } = req.params;
    const { location_name, parish } = req.body;

    try {
        await pool.query('UPDATE locations SET location_name = ?, parish = ? WHERE location_id = ?',
            [location_name, parish, id]);
        res.status(200).json({ status: 'success', message: 'Location updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Function to delete a location
export const deleteLocation = async (req, res) => {
    const { id } = req.params;

    try {
        await pool.query('DELETE FROM locations WHERE location_id = ?', [id]);
        res.status(200).json({ status: 'success', message: 'Location deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};
