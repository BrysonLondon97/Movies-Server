const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const profileSchema = new mongoose.Schema({
    email: {
        type: 'string',
        unique: true,
        required: true
    },
    password: {
        type: 'string',
        required: true
    }
});

//run the password through a salt/hash function
profileSchema.pre('save', function(next) {

    const user = this;
    if (!user.isModified('password')){
        return next();
    }

    bcrypt.genSalt(10, (err,salt) => {
        if (err){
            return next(err);
        }


        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err){
                return next(err);
            }

            user.password = hash;
            next();
        });
    });    

});

profileSchema.methods.comparePassword = function(candidatePassword){
    const user = this;
    
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }
    
            if (!isMatch) {
                return reject(false);
            }
    
            resolve(true);
        });
    });
}


mongoose.model('Profiles', profileSchema);