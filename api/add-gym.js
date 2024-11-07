// Import necessary modules
import pkg from 'pg'; // Import the default export from 'pg'
const { Pool } = pkg; // Destructure Pool from the default import
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env

// Create a connection pool to the PostgreSQL database
const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT || 5432,
  ssl: {
    rejectUnauthorized: false, // Adjust SSL settings for production as needed
  }
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        // Extract data from the request body (no 'id' is extracted)
        const { name, description, latitude, longitude, location_name } = req.body;
  
        // Validate required fields
        if (!name || !latitude || !longitude || !location_name) {
          return res.status(400).json({ message: 'Missing required fields' });
        }
  
        // Query the current maximum 'id' from the 'gyms' table
        const idResult = await pool.query('SELECT MAX(id) AS max_id FROM gyms');
        const nextId = (idResult.rows[0].max_id || 0) + 1; // Increment the current maximum 'id' by 1
  
        // Insert the new gym into the database with the next 'id'
        const result = await pool.query(
          `INSERT INTO gyms (id, name, description, latitude, longitude, location_name)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING *`,
          [nextId, name, description, latitude, longitude, location_name]
        );
  
        // Respond with the newly created gym record
        res.status(201).json(result.rows[0]);
      } catch (error) {
        console.error('Error adding a new gym:', error.message);
        res.status(500).send('Server error');
      }
    } else {
      // Return a 405 status if the request method is not POST
      res.status(405).json({ message: 'Method not allowed' });
    }
  }