require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Listing = require('./models/Listing')

const app = express();

app.use(cors())
app.use(express.json())

app.post('/api/listings', async(req, res) => {
    try {
        const newListing = new Listing(req.body)

        const savedListing = await newListing.save()

        res.status(200).json(savedListing);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.get('/api/listings', async(req, res) => {
    try {
       const allListings = await Listing.find();
       res.status(200).json(allListings);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
    console.log('Server running on port 3001')
})
