const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Could not connect to MongoDB', err));


app.get('/', (req, res) =>{
    res.send('coucou')
})
app.use(express.urlencoded({extended: false}))
app.use('/api',require('./routes/userRoutes'))
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}...`));
