const mongoose = require('mongoose');

const Details = new mongoose.Schema({
    id: Number,
    title: String,
    backdrop: String,
    poster: String,
    overview: String,
    release_date: String
})

mongoose.model('Movie Details', Details)