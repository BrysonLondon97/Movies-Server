const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Details = mongoose.model('MovieDetails');

//make a router varaible
const router = express.Router();
//make sure user is authenticated before trying to edit,change, add a track
router.use(requireAuth);

//handle the .get http request to details route
router.get('/details', async (req, res) =>{
    const {_id} = req.user
    
    //find the user
    const details = await Details.find({_id});
    //send back the movie details associated with the user
    res.send(details);
});


router.post('/details', async (req, res) =>{
    const {details} = req.body;
    const {_id} = req.user;
    if(!details){
        return res.status(422).send({error: 'You must provide some movie details'});
    }

    try{
        const data = new Details({details, _id });
        await data.save();
        res.send(data);
    } catch (err){
        res.status(422).send({error: err.message});
    }
    

});


module.exports = router