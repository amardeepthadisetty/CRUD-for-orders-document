const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

var bodyParser = require('body-parser');

const app = express();

//app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

//connect to MONGOdb
connectDB();

//initiate middlware to accept json data
//app.use(express.json({ extended: false }));
//app.use(express.bodyParser());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

 
//Defining Routes through Middleware
app.use('/api/orders', require('./routes/orders'));

app.get('/', (req, res) => {
    res.send({"hello": "world"});
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening to port ${PORT} `);
});
