const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    driver: {
        type: Boolean,
        required: true,
        default: false
    },
    address: {
        type: String,
        required: false
    },
    region: {
        type: String,
        required: false
    }
})
module.exports = mongoose.model('User',userSchema)