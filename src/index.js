const express = require('express');
const app = express();

//anytime a HTTP .get request to this application, run this code
app.get('/', (req, res) => {
    res.send('Hi there');
});

//run the app on our local 3000 port on my machine
app.listen(3000, () => {
    console.log('Listening on port 3000');''
});

