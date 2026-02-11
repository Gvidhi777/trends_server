require("dotenv").config()

const express = require("express")
const cors = require("cors")
const pool = require("./db")

const contactRoutes = require("./routes/contact")

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Health check
app.get("/", (req, res) => {
    res.json({ message: "Backend is running!" })
})

// Contact API
app.use("/contact", contactRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})








//const express = require('express');
//const cors = require('cors');
//const pool = require('./db');
//require('dotenv').config();


//const app = express();
//const PORT = process.env.PORT || 5000;

//// Middleware
//app.use(cors());
//app.use(express.json());

//// Create table if it doesn't exist
//const createTable = async () => {
//    try {
//        await pool.query(`
//      CREATE TABLE IF NOT EXISTS form_submissions (
//        id SERIAL PRIMARY KEY,
//        name VARCHAR(255) NOT NULL,
//        contact_number VARCHAR(20) NOT NULL,
//        location VARCHAR(255) NOT NULL,
//        page_url TEXT,
//        message TEXT,
//        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//      )
//    `);
//        console.log('Table created or already exists');
//    } catch (error) {
//        console.error('Error creating table:', error);
//    }
//};

//createTable();

//const contactRoutes = require("./routes/contact")

//app.use("/contact", contactRoutes)

//// Routes
//app.get('/', (req, res) => {
//    res.json({ message: 'Backend is running!' });
//});

//// POST endpoint to submit form
//app.post('/api/submit-form', async (req, res) => {
//    try {
//        const { name, contact_number, location, page_url, message } = req.body;

//        // Validation
//        if (!name || !contact_number || !location) {
//            return res.status(400).json({ error: 'Name, contact number, and location are required' });
//        }

//        const result = await pool.query(
//            'INSERT INTO form_submissions (name, contact_number, location, page_url, message) VALUES ($1, $2, $3, $4, $5) RETURNING *',
//            [name, contact_number, location, page_url, message]
//        );

//        res.status(201).json({
//            message: 'Form submitted successfully',
//            data: result.rows[0]
//        });
//    } catch (error) {
//        console.error('Error submitting form:', error);
//        res.status(500).json({ error: 'Internal server error' });
//    }
//});

//// GET endpoint to retrieve all submissions (optional)
//app.get('/api/submissions', async (req, res) => {
//    try {
//        const result = await pool.query('SELECT * FROM form_submissions ORDER BY created_at DESC');
//        res.json(result.rows);
//    } catch (error) {
//        console.error('Error fetching submissions:', error);
//        res.status(500).json({ error: 'Internal server error' });
//    }
//});

//app.listen(PORT, () => {
//    console.log(`Server is running on port ${PORT}`);
//});