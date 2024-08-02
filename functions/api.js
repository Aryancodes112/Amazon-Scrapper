const express = require('express');
const serverless = require('serverless-http');
const axios = require('axios');

const app = express();

const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/products/:productID', async (req, res) => {
  const { productID } = req.params;
  const { api_key } = req.query;
  const fullUrl = `${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productID}`;
  console.log('Requesting URL:', fullUrl);
  
  try {
    const response = await axios.get(fullUrl);
    console.log('Raw response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({
      message: 'An error occurred while fetching product data',
      error: 'Internal server error'
    });
  }
});

// Add other routes (reviews, offers, search) here...

module.exports.handler = serverless(app);