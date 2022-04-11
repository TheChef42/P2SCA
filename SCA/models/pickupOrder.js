const mongoose = require('mongoose')


const pickupOrderSchema = new mongoose.Schema({
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
    }
})
module.exports = mongoose.model('PickupOrder',pickupOrderSchema)