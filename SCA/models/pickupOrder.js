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
    },
    driver: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: false
    }
})
module.exports = mongoose.model('PickupOrder',pickupOrderSchema)