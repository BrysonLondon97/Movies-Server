const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Profiles = mongoose.model('Profiles');

const router = express.Router();

router.post('/signup', async (req, res) => {
    //destructure off the email and password from the body of the request
    const {email, password} = req.body;
    
    try{
        //create a new user with the 'Profile" model
        const user = new Profiles({email, password});
        //save the user to the database
        await user.save();

        //generate a JSONWebToken to use to authenticate the user, encrypting the user's ID
        const token = jwt.sign({userId: user._id}, 'Secret_Key')

        res.send({token});
    } catch ( e ) {
        return res.status(422).send(e.message);
    }
});

router.post('/signin', async (req, res) => {
    //destructure off the email and password from the body of the request
    const {email, password} = req.body;

    //if user did not provide email/password then send an erorr message
    if(!email || !password){
        return res.status(422).send({error: 'Must provide email and password'});
    }

    //else try to find the user in the database
    const user = await Profiles.findOne({email})
    if (!user) {
        return res.status(422).send({error: 'Email not found'});
    }

    try{
        await user.comparePassword(password);
        const token = jwt.sign({userId: user._id}, 'Secret_Key')
        res.send({token});
    } catch (err){
        return res.status(422).send({error: 'Invalid password or email'});   
    }
});


module.exports = router;




