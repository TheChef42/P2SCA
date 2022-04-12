const mongoose = require('mongoose')


const ratingSystemSchema = new mongoose.Schema({
    Rating: {
        type: Number,
        required: true
    },
    Comment: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Rating', RatingSystemSchema)