const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'form_builder'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

app.post('/save-form', (req, res) => {
    const formData = req.body;
    formData.forEach(field => {
        const { label, type, value } = field;
        const query = 'INSERT INTO form_data (field_label, field_type, field_value) VALUES (?, ?, ?)';
        db.query(query, [label, type, value], (err, result) => {
            if (err) throw err;
        });
    });
    res.send('Form saved successfully!');
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});