const mongoose = require('mongoose')


const pictureInfochema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})
module.exports = mongoose.model('PictureInfo',pictureInfoSchema)