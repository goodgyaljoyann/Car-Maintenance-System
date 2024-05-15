import pool from '../database/index.js';


export const getAllServices = async (_req, res, _next) => {
    try {
        let sqlQuery = `SELECT * FROM services`;
        const [services] = await pool.query(sqlQuery);

        res.status(200).json({
            status: 'success',
            results: services.length,
            data: { services },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const getServiceById = async (req, res, _next) => {
    try {
        const serviceId = req.params.id;
        let sqlQuery = `SELECT * FROM services WHERE service_id = ?`;
        const [service] = await pool.query(sqlQuery, [serviceId]);
        //Error handling to check if there is a record or not
        if (service.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Service not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { service: service[0] }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};


export const createService = async (req, res, _next) => {
    try {
      const { service_name, description, location_id, price } = req.body;
      const img = req.file.filename; // Retrieve filename of the uploaded image

      let sqlQuery = `INSERT INTO services (service_name, description, location_id, price, img) VALUES (?, ?, ?, ?, ?)`;
      const result = await pool.query(sqlQuery, [service_name, description, location_id, price, img]);

  
      res.status(201).json({
        status: 'success',
        data: { result }
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        message: 'Internal server error',
        error: error.message
      });
    }
  };

export const updateService = async (req, res, _next) => {
    try {
        const serviceId = req.params.id;
        const img = req.file.filename; // Retrieve filename of the uploaded image
        const {service_name, description, location_id, price} = req.body;
        let sqlQuery = `UPDATE services SET service_name=?, description=?, location_id=?, price=?, img=? WHERE service_id=?`;
        await pool.query(sqlQuery, [service_name, description, location_id, price, img, serviceId]);

        res.status(200).json({
            status: 'success',
            message: 'Service Info updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const deleteService = async (req, res, _next) => {
    try {
        const serviceId = req.params.id;
        let sqlQuery = `DELETE FROM services WHERE service_id=?`;
        await pool.query(sqlQuery, [serviceId]);

        res.status(200).json({
            status: 'success',
            message: 'Service deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};
