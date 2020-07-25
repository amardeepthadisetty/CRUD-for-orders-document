const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

//connect to MONGOdb
connectDB();

//initiate middlware to accept json data
app.use(express.json({ extended: false }));

 
//Defining Routes through Middleware
app.use('/api/orders', require('./routes/orders'));

app.get('/', (req, res) => {
    res.send({"hello": "world"});
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT} `);
});
