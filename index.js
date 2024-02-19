// index.cjs
const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3000;

app.get('/get', async (req, res) => {
  try {
    const filePath = path.join("./util", 'data.json');
    const data = await fs.readFile(filePath, 'utf-8');
    console.log('Current working directory:', process.cwd());
    console.log('Path to JSON file:', filePath);
    const jsonData = JSON.parse(data);
    res.json(jsonData);
  } catch (error) {
    console.error('Error reading the JSON file:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Exporting both app and server
module.exports = { app, server };
