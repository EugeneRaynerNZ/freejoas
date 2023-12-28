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
// require('dotenv').config();

//get the environment variables from the .env file
const PORT = process.env.PORT || 4000; 
const mongodbURL = process.env.MONGO_DB_URL;

//import the database model
const User = require('./model/User');
const Location = require('./model/Location');
const bingMap = require('./services/BingMap');


//ininialize express app
const express = require('express'); 
const mongoose = require('mongoose');
const app = express();


// Connect to MongoDB
mongoose.connect(mongodbURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Check if MongoDB is connected
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.info('Connected to MongoDB');
    console.info(`----------------------------`);
});


// Start the server
app.get('/', (req, res) => {
    res.send('Hello World! - from freejoas-backend');
    });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    });


//create a new user
app.post('/api/user',(req, res) =>{
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        collectedLocations: req.body.collectedLocations,
    });
    user.save().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

//get all users
app.get('/api/user',(req, res) =>{
    User.find().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

//get a user by id
app.get('/api/user/:id',(req, res) =>{
    User.findById(req.params.id).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

//update a user by id
app.put('/api/user/:id',(req, res) =>{
    User.findById(req.params.id).then((result) => {
        result.username = req.body.username;
        result.email = req.body.email;
        result.password = req.body.password;
        result.collectedLocations = req.body.collectedLocations;
        result.save();
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

//delete a user by id
app.delete('/api/user/:id',(req, res) =>{
    User.findByIdAndDelete(req.params.id).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    });
});

//return current location
app.get('/api/location/current',(req, res) => {
    bingMap.getCurrentLocation().then((result) => {
        res.send(result);
        console.info(result);
    }).catch((err) => {
        console.log(err);
    });
});
