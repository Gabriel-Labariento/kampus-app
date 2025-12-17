require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Listing = require('./models/Listing')

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://kampus-app.vercel.app"
    ],
    credentials: true
}))
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
            // Use MongoDB text search for better performance with text index
            query.$text = { $search: search }
        }

        if (category && category !== 'All') {
            query.category = category;
        }

        // Use lean() for better performance when we don't need Mongoose documents
        // Add projection to only select needed fields for better performance
        const listings = await Listing.find(query)
            .select('title price category imageUrl school clerkUserId condition createdAt')
            .sort(search ? { score: { $meta: 'textScore' }, createdAt: -1 } : { createdAt: -1 })
            .limit(20)
            .lean()
            .exec()

        // Set cache headers for better client-side performance
        res.set('Cache-Control', 'public, max-age=60') // Cache for 1 minute
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.get('/api/listings/user/:userId', async(req, res) => {
    try {
        const userId = req.params.userId;

        // Use lean() for better performance and add sorting
        const userListings = await Listing.find({clerkUserId: userId})
            .sort({createdAt: -1})
            .lean()
            .exec()
            
        res.status(200).json(userListings)
    } catch (error) {
        res.status(500).json({error: "Could not fetch listings for user."})
    }
})

app.get('/api/listings/:itemId', async(req, res) => {
    try {
        // Use lean() for better performance
        const listing = await Listing.findById(req.params.itemId).lean().exec();

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

mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10, // Maintain up to 10 socket connections
    minPoolSize: 2,  // Maintain at least 2 socket connections
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log('Server running')
})

