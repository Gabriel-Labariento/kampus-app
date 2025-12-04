const mongoose = require('mongoose')

const ListingSchema = new mongoose.Schema({
    title: { type: String, required: true},
    price: {type: Number, required: true},
    description: String,
    category: {
        type: String,
        enum: ['Books', 'Uniforms', 'Electronics', 'Misc'], 
        required: true,
    },
    imageUrl: String,
    sellerEmail: String,
    school: {type: String, default: 'UP/DLSU/UST/ADMU'},

}, {timestamps: true})

module.exports = mongoose.model("Listing", ListingSchema)