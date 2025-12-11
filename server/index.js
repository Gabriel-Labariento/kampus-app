require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Listing = require('./models/Listing')
const cloudinary = require('cloudinary').v2;

cloudinary.config()

const app = express();

app.use(cors())
app.use(express.json())

const isStudentEmail = (email) => {
    const allowed = ["@up.edu.ph",
    "@student.ateneo.edu",
    "@dlsu.edu.ph",
    "@ust.edu.ph"]

    return allowed.some(domain => email.endsWith(domain));
}

app.post('/api/listings', async(req, res) => {
    try {

        if (!isStudentEmail(req.body.sellerEmail)) return res.status(403).json({error: "Invalid University Email Domain"})
        const newListing = new Listing(req.body)
        const savedListing = await newListing.save()
        console.log("Saved to db:", savedListing)
        res.status(200).json(savedListing)
    } catch (error) {
        console.error("Error saving:", error)
        res.status(500).json({error: error.message})
    }
})

app.get('/api/listings', async(req, res) => {
    try {
        const {search, category} = req.query;

        let query = {}

        if (search) {
            const searchTerms = search.trim().split(/\s+/)

            const regexConditions = searchTerms.map(term => ({
                $or: [
                    {title: {$regex: term, $options: 'i'}},
                    {description: {$regex: term, $options: 'i'}}
                ]
            }));
            
            query.$and = regexConditions;
        }

        if (category && category !== 'All') {
            query.category = category;
        }

        const listings = await Listing.find(query).sort({createdAt: -1})

       res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.get('/api/listings/user/:userId', async(req, res) => {
    try {
        const userId = req.params.userId;

        const userListings = await Listing.find({clerkUserId: userId})
        res.status(200).json(userListings)
    } catch (error) {
        res.status(500).json({error: "Could not fetch listings for user."})
    }
})

app.get('/api/listings/:itemId', async(req, res) => {
    try {
        const listing = await Listing.findById(req.params.itemId);

        if (!listing) {
            return res.status(404).json({error: "Item not found"})
        }

        res.status(200).json(listing)
    } catch (error) {
        res.status(500).json({error: "Server error"})
    }
})

app.delete('/api/listings/:itemId', async(req, res) => {
    const itemId = req.params.itemId
    try {
        const result = await Listing.findByIdAndDelete(itemId);
        if (!result) {
            return res.status(404).json({error: "Item not found"})
        }
        res.status(200).json({message: `Item with id ${itemId} deleted successfully`});
    } catch (error) {
        res.status(500).json({error: `Could not delete item with id ${itemId}`})
    }
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
    console.log('Server running')
})

