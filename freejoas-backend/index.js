/**
    * Project: freejoas-app-backend
    * File: index.js
    * Desc: This is the main entry point for the backend server
    * Author: wsking233
    * Created: 12/12/2023
    * Framework: Express
    * Language: Node.js
    * Port:4000
    * 
**/

// Load environment variables
require('dotenv').config();

//get the environment variables from the .env file
const PORT = process.env.PORT; 
const mongodbURL = process.env.MONGO_DB_URL;

//import the database model
// const Freejoas = require('./model/FreejoasModel');

//ininialize express app
const express = require('express'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//import routes
const freejoasRouter = require('./router/freejoasRouter');

//use routes
app.use('/api', freejoasRouter);

// Connect to MongoDB
mongoose.connect(mongodbURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Create an HTTPS server
const options = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem')
};

// Start the server
https.createServer(options,app).listen(PORT, () => {
    console.log(`Server listening on port ${PORT} (HTTPS)`);
});

https.get('/', (req, res) => {
    res.send('Hello World! - from HTTPS freejoas-backend');
    });

// app.get('/', (req, res) => {
//     res.send('Hello World! - from freejoas-backend');
//     });
// 
// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
//     });

// Check if MongoDB is connected
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.info('Connected to MongoDB');
    console.info(`----------------------------`);
});

