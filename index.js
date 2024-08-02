const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

const generateScraperUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Get products
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

//Get Product Reviews
app.get('/products/:productID/reviews', async (req, res) => {
  const { productID } = req.params;
  const { api_key } = req.query;
  const fullUrl = `${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productID}`;
  console.log('Requesting URL:', fullUrl);
  
  try {
    const response = await axios.get(fullUrl);
    
    console.log('Raw response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({
      message: 'An error occurred while fetching product reviews',
      error: 'Internal server error'
    });
  }
});

//Get Product Offers
app.get('/products/:productID/offers', async (req, res) => {
  const { productID } = req.params;
  const { api_key } = req.query;
  const fullUrl = `${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productID}`;
  console.log('Requesting URL:', fullUrl);
  
  try {
    const response = await axios.get(fullUrl);
    
    console.log('Raw response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({
      message: 'An error occurred while fetching product offers',
      error: 'Internal server error'
    });
  }
});

//Amazon Search Query
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params;
  const { api_key } = req.query;
  const fullUrl = `${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${encodeURIComponent(searchQuery)}`;
  console.log('Requesting URL:', fullUrl);
  
  try {
    const response = await axios.get(fullUrl);
    
    console.log('Raw response:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({
      message: 'An error occurred while fetching search results',
      error: 'Internal server error'
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});