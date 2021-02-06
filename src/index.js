require('./models/Profiles');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

//make sure to parse the data that is being passed into the different routes with JSON data
app.use(bodyParser.json());
app.use(authRoutes);

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
//can only access this route with a jsonwebtoken
app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`);
});

//run the app on our local 3000 port on my machine
app.listen(3000, () => {
    console.log('Listening on port 3000');
});

