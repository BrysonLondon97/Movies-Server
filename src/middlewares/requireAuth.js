const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Profiles = mongoose.model('Profiles');

module.exports = (req, res, next) => {
    //authorization == 'Bearer' ejashsgoaownfofman (jsonwebtoken)
    //desctructure off the authorization header, and extract the token from it
    const {authorization} = req.headers;

    //if there is no authorization header, then the user cant get access
    if (!authorization){
        return res.status(401).send({error: 'You must be logged in. 1 '});
    }

    //get the jsonwebtoken off of the authorization header, and verify it
    const token = authorization.replace('Bearer ', '');
    console.log(token);
    //if the token cant be verified, then send an error, else extract the user's id
    jwt.verify(token, 'Secret_Key', async (err, payload) => {
        if (err){
            return res.status(401).send({error: 'You must be logged in. 2 '});
        }

        const { userId } = payload;
        const user = await Profiles.findById(userId);
        req.user = user;
        next();
    });
};