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
    clerkUserId: {
        type: String,
        required: true,
        index: true // Add indexing for faster lookups
    },
    condition: { type: String, enum: ['Brand New', 'Like New', 'Used - Good', 'Well Used'] }
}, {timestamps: true})

// Add indexes for better query performance
ListingSchema.index({ title: 'text', description: 'text' }) // Text index for search
ListingSchema.index({ category: 1 }) // Index for category filtering
ListingSchema.index({ createdAt: -1 }) // Index for sorting by creation date
ListingSchema.index({ category: 1, createdAt: -1 }) // Compound index for category + sort

module.exports = mongoose.model("Listing", ListingSchema)