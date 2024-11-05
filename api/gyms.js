import pkg from 'pg';  // Import the default export from 'pg'
const { Pool } = pkg;  // Destructure Pool from the default import
import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.PORT || 5432,
  ssl: {
    rejectUnauthorized: false,  // Adjust SSL settings for production as needed
  }
});

// Vercel serverless function handler
export default async function handler(req, res) {
  if (req.method === 'GET') {  // Change to handle GET requests
    try {
      // Query the database to get all gyms
      const result = await pool.query('SELECT * FROM gyms');  // Fetch all records from gyms table
      res.status(200).json(result.rows);  // Send the results back as JSON

    } catch (error) {
      console.error('Error fetching gyms:', error.message);
      res.status(500).send('Server error');
    }

  } else {
    // If the request is not a GET request, return a 405 (Method Not Allowed) status
    res.status(405).json({ message: 'Method not allowed' });
  }
}
