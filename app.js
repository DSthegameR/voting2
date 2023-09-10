const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware for parsing JSON requests
app.use(bodyParser.json());

// In-memory storage for numbers (replace with a database in a production app)
const storedNumbers = [];

// Serve static files from the "public" directory
app.use(express.static('public'));

// API endpoint to store numbers
app.post('/api/store-number', (req, res) => {
  const { number } = req.body;

  if (!number) {
    return res.status(400).json({ error: 'Number is required' });
  }

  if (number > 10) {
    return res.status(400).json({ error: 'Number cannot be greater than 10' });
  }

  // Store the number (in-memory for this example)
  storedNumbers.push(number);

  res.json({ message: 'Number stored successfully' });
});

// API endpoint to retrieve stored numbers
app.get('/api/get-numbers', (req, res) => {
  res.json({ numbers: storedNumbers });
});

// API endpoint to clear all entries
app.delete('/api/clear-entries', (req, res) => {
  storedNumbers.length = 0; // Clear the stored numbers array
  res.json({ message: 'All entries cleared successfully' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
