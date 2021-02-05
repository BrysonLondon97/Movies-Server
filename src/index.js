const express = require('express');
const mongoose = require('mongoose');
const app = express();

//create a mongoDB URI variable
const mongoURI = 'mongodb+srv://admin:passwordpassword@cluster0.epw0m.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

//once connected to the mongoDB server, display a message in the console log
mongoose.connection.on('connected', () => {
    console.log('Connected to mongoDB');
});
//if there is an error while trying to connect, display the error in console log
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongoDB', err)
});


//anytime a HTTP .get request to this application, run this code
app.get('/', (req, res) => {
    res.send('Hi there');
});

//run the app on our local 3000 port on my machine
app.listen(3000, () => {
    console.log('Listening on port 3000');
});

