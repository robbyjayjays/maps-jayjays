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

// API route handler for fetching gyms
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Extract latitude and longitude from query parameters
      const { lat, lng } = req.query;

      let result;
      if (lat && lng) {
        // Fetch 3 closest gyms if coordinates are provided
        result = await pool.query(
          `SELECT *,
           ST_DistanceSphere(
             point(longitude, latitude),
             point($1, $2)
           ) AS distance
           FROM gyms
           ORDER BY distance
           LIMIT 3`,
          [lng, lat]
        );
      } else {
        // Fetch all gyms if no coordinates are provided
        result = await pool.query('SELECT * FROM gyms');
      }

      // Respond with the results in JSON format
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching gyms:', error.message);
      res.status(500).send('Server error');
    }
  } else {
    // Return a 405 status if the request method is not GET
    res.status(405).json({ message: 'Method not allowed' });
  }
}
