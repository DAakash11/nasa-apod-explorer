const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = 5000;

app.get('/api/apod', async (req, res) => {
  const { date, start_date, end_date, count } = req.query;
  console.log('Query received:', req.query);
  const baseUrl = `https://api.nasa.gov/planetary/apod`;
  
  try {
    const response = await axios.get(baseUrl, {
      params: {
        api_key: process.env.NASA_API_KEY,
        ...(count && { count }),
        ...(date && { date }),
        ...(start_date && { start_date }),
        ...(end_date && { end_date })
      },
      timeout: 5000,
    });

    console.log('APOD dates returned:', response.data.map(item => item.date));

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching APOD:', error?.response?.status, error.message);

    if (error.code === 'ECONNABORTED') {
      res.status(504).json({ error: 'NASA API timed out' });
    } else if (error.response?.status === 400) {
      res.status(400).json({ error: 'Invalid date or bad request' });
    } else if (error.response?.status === 404) {
      res.status(404).json({ error: 'No data found for this date' });
    } else {
      res.status(500).json({ error: 'Something went wrong with NASA API' });
    }
 }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
