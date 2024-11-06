export default async function handler(req, res) {
    if (req.method === 'GET') {
      try {
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
  
        res.status(200).json(result.rows);
      } catch (error) {
        console.error('Error fetching gyms:', error.message);
        res.status(500).send('Server error');
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  