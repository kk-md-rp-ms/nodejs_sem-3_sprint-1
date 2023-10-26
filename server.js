// Import necessary libraries and modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // You can use any port you prefer

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Dummy data for gym members and classes (usually you'd use a database)
const members = [];
const classes = [];

// Define routes for the gym management system

// Endpoint to add a new gym member
app.post('/members', (req, res) => {
  const newMember = req.body;
  members.push(newMember);
  res.status(201).json(newMember);
});

// Endpoint to get a list of all gym members
app.get('/members', (req, res) => {
  res.status(200).json(members);
});

// Endpoint to add a new fitness class
app.post('/classes', (req, res) => {
  const newClass = req.body;
  classes.push(newClass);
  res.status(201).json(newClass);
});

// Endpoint to get a list of all fitness classes
app.get('/classes', (req, res) => {
  res.status(200).json(classes);
});

// Start the server
app.listen(port, () => {
  console.log(`Gym server is running on port ${port}`);
});

module.exports = app; // Export the Express app for testing

