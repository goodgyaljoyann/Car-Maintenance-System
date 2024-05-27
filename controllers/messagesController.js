import pool from '../database/index.js';

// Function to get all appointments
export const getAllMessages = async (req, res) => {
    try {
        const messages = await pool.query('SELECT * FROM messages');
        res.status(200).json({ status: 'success', data: messages[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// // Function to get appointment by ID
// export const getMessageById = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const message = await pool.query('SELECT * FROM messages WHERE message_id = ?', [id]);
//         if (message[0].length === 0) {
//             return res.status(404).json({ status: 'error', message: 'Message not found' });
//         }
//         res.status(200).json({ status: 'success', data: message[0][0] });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: 'error', message: 'Internal server error' });
//     }
// };

// Function to get the last message by customer ID
export const getLastMessageByCustomerId = async (req, res) => {
    const { customer_id } = req.params;

    try {
        const messages = await pool.query(
            'SELECT * FROM messages WHERE customer_id = ? ORDER BY created_at DESC LIMIT 1',
            [customer_id]
        );
        if (messages[0].length === 0) {
            return res.status(404).json({ status: 'error', message: 'No messages found for this customer' });
        }
        res.status(200).json({ status: 'success', data: messages[0][0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Function to get the last appointment ID by customer ID
export const getLastAppointmentIdByCustomer = async (customerId) => {
    try {
        const [rows] = await pool.query(
            `SELECT appointment_id FROM appointments WHERE customer_id = ? ORDER BY appointment_id DESC LIMIT 1`,
            [customerId]
        );
        return rows[0]?.appointment_id;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createMessage = async (req, res) => {
    try {
      const { customer_id, message_content } = req.body;
      const appointmentId = await getLastAppointmentIdByCustomer(customer_id);
  
      const query = `INSERT INTO messages (customer_id, appointment_id, message_content) VALUES (?, ?, ?)`;
      const values = [customer_id, appointmentId, message_content];
      await pool.query(query, values);
  
      res.status(201).json({ status: 'success', message: 'Message created successfully' }); // Ensure status is 'success'
    } catch (err) {
      console.error('Error creating message:', err);
      res.status(500).json({ status: 'error', error: 'Internal server error' }); // Include status 'error'
    }
  };
  

// Controller for admins updating the message reply
export const updateMessageReply = async (req, res) => {
    try {
        const { message_id } = req.params;
        const { admin_id, reply } = req.body;

        const query = `UPDATE messages SET reply = ?, admin_id = ? WHERE message_id = ?`;
        const values = [reply, admin_id, message_id];
        await pool.query(query, values);

        res.json({ message: 'Message reply updated successfully' });
    } catch (err) {
        console.error('Error updating message reply:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
