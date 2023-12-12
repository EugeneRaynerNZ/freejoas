/**
    * Project: freejoas-app-backend
    * File: index.js
    * Desc: This is the main entry point for the backend server
    * Author: wsking233
    * Created: 12/12/2023
    * Framework: Express
    * Language: Node.js
    * 
**/

// Load environment variables
require('dotenv').config();

//get the environment variables from the .env file
const PORT = process.env.PORT; 
// const mongodbURL = process.env.MONGODB_URL;


//ininialize express app
const express = require('express'); 
// const mongoose = require('mongoose');
const app = express();


// Connect to MongoDB
// mongoose.connect(mongodbURL,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// Check if MongoDB is connected
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//     console.info('Connected to MongoDB');
//     console.info(`----------------------------`);
// });


// Start the server
app.get('/', (req, res) => {
    res.send('Hello World! - from freejoas-backend');
    });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    });