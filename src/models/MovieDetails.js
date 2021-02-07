const mongoose = require('mongoose');

const Details = new mongoose.Schema({
    details:{
        movieId: Number,
        title: String,
        backdrop: String,
        poster: String,
        overview: String,
        release_date: String
    }
})

mongoose.model('MovieDetails', Details)