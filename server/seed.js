require('dotenv').config();
const mongoose = require('mongoose');
const Listing = require('./models/Listing'); // Adjust path if your model is in a subfolder

// Fake Data tailored for a PH University setting
const sampleListings = [
    {
        title: "TC7 Calculus Book (Leithold)",
        price: 800,
        description: "Bible of Calculus. Hardbound, slightly used pages but intact. Good for Engg students.",
        category: "Books",
        school: "UP Diliman",
        imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
        clerkUserId: "user_fake123", 
        sellerEmail: "engg_student@up.edu.ph"
    },
    {
        title: "Casio Sci-Cal fx-991ES Plus",
        price: 450,
        description: "Pink color. Allowed in board exams. Fresh batteries.",
        category: "Electronics",
        school: "UST",
        imageUrl: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&q=80&w=800",
        clerkUserId: "user_fake123",
        sellerEmail: "archi_student@ust.edu.ph"
    },
    {
        title: "P.E. Uniform (Jogging Pants + Shirt) Size M",
        price: 300,
        description: "Standard PE uniform. No tears. Freshly laundered.",
        category: "Uniforms",
        school: "DLSU",
        imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
        clerkUserId: "user_fake123",
        sellerEmail: "lasallian@dlsu.edu.ph"
    },
    {
        title: "Drafting Table (Portable)",
        price: 1500,
        description: "24x36 inches. With T-Square included. RFS: Shifted course.",
        category: "Misc",
        school: "Mapua",
        imageUrl: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=800",
        clerkUserId: "user_fake123",
        sellerEmail: "archi@mapua.edu.ph"
    },
    {
        title: "Nursing Duty Shoes (White) Size 7",
        price: 600,
        description: "Used for 1 sem only. Very comfortable memory foam.",
        category: "Uniforms",
        school: "FEU",
        imageUrl: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800",
        clerkUserId: "user_fake123",
        sellerEmail: "nurse@feu.edu.ph"
    },
    {
        title: "iPad Air 4th Gen (64GB) + Pencil",
        price: 22000,
        description: "Space Gray. No scratches. Good for digital notes.",
        category: "Electronics",
        school: "Ateneo",
        imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=800",
        clerkUserId: "user_fake123",
        sellerEmail: "blue_eagle@ateneo.edu"
    },
    {
        title: "Lab Gown / Laboratory Coat (White)",
        price: 250,
        description: "Generic lab gown. Missing one button but functional.",
        category: "Uniforms",
        school: "UP Manila",
        imageUrl: "https://images.unsplash.com/photo-1576091160550-217358c7db81?auto=format&fit=crop&q=80&w=800",
        clerkUserId: "user_fake123",
        sellerEmail: "med@upm.edu.ph"
    },
    {
        title: "Accounting Reviewers (Complete Set)",
        price: 1200,
        description: "Valix, Peralta, Valix. Annotated with highlights.",
        category: "Books",
        school: "PUP",
        imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800",
        clerkUserId: "user_fake123",
        sellerEmail: "cpa_road@pup.edu.ph"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB...");

        // OPTIONAL: Delete existing data first (Uncomment if you want a fresh start)
        // await Listing.deleteMany({});
        // console.log("Old data removed...");

        await Listing.insertMany(sampleListings);
        console.log("Seed Data Inserted Successfully!");
        
        process.exit();
    } catch (error) {
        console.log("Seeding failed:", error);
        process.exit(1);
    }
};

seedDB();