const mongoose = require('mongoose')


const pickupOrderSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('PickupOrder',pickupOrderSchema)