# Kampus | Exclusive Student Marketplace

![MERN Stack](https://img.shields.io/badge/MERN-Full%20Stack-blue)
![Status](https://img.shields.io/badge/Status-Deployed-green)

**Kampus** is a verified, peer-to-peer marketplace built specifically for Filipino university students. It solves the problem of disorganized Facebook Groups and unverified transactions by creating a "walled garden" where students with valid `.edu.ph` emails can trade books, uniforms, and dorm essentials safely.

<img width="1469" height="756" alt="Screenshot 2025-12-12 at 8 49 39 AM" src="https://github.com/user-attachments/assets/f9dd981e-d220-4675-958b-c4585b646f5e" />
<img width="1470" height="709" alt="Screenshot 2025-12-12 at 8 51 54 AM" src="https://github.com/user-attachments/assets/1ccac7ec-ce61-41ea-86ac-0bab5d00a8b0" />
<img width="1470" height="757" alt="Screenshot 2025-12-12 at 8 53 44 AM" src="https://github.com/user-attachments/assets/25077a8b-d629-43bd-a80e-09e2bbb004ee" />


## 🚀 Live Demo

- **Frontend (Vercel):** [https://kampus-app.vercel.app](https://kampus-app.vercel.app)
- **Backend (Render):** [https://kampus-backend.onrender.com](https://kampus-backend.onrender.com)

> **Note:** The backend is hosted on Render's Free Tier. It spins down after inactivity. Please allow **50-60 seconds** for the server to wake up on the first request.

## 💡 The Problem
In the Philippines, students rely on "University Trade Groups" on Facebook to buy/sell items. These groups suffer from:
1.  **Lack of Verification:** Outsiders and scammers can join easily.
2.  **Poor Search:** Finding a specific "Calculus 7th Edition" book is difficult in a linear social feed.
3.  **Unstructured Data:** No standard pricing or categorization.

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React (Vite), Tailwind CSS, React Router DOM |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose), Atlas |
| **Auth** | Clerk (Identity Management) |
| **Media** | Cloudinary (Image Optimization) |
| **Deployment** | Vercel (Client) + Render (Server) |

## ✨ Key Features

### 🔒 Student-Only Authentication
- Implemented **Role-Based Access Control (RBAC)** using Clerk.
- **"Bouncer" Logic:** Custom middleware restricts sign-ups/posting to specific domains (`up.edu.ph`, `dlsu.edu.ph`, `ust.edu.ph`, etc.).
- **Guest Mode:** Non-students can browse listings but cannot view seller contact info or post items.

### 🔍 Optimized Backend Search
- Moved search logic from Client-side to Server-side to handle large datasets efficiently.
- Uses MongoDB **Regex** with `$and`/`$or` operators to perform fuzzy search on both Titles and Descriptions.
- Supports **Composite Filtering** (Category + Search + Pagination)

## ⚙️ Engineering Challenges & Solutions

**1. The "Base64" Database Crash**
*   **Problem:** Initially, I stored images as Base64 strings directly in MongoDB. This caused the document size to exceed 4MB, leading to timeouts on the free-tier server.
*   **Solution:** Refactored the architecture to use **Cloudinary**. Now, the frontend uploads the image directly to the CDN, receives a lightweight URL string, and stores only that string in MongoDB. This reduced query payload size by 99%.

**2. Mutable Identity**
*   **Problem:** Linking items to users via `email` was risky, as students might change emails or graduate.
*   **Solution:** Updated the schema to link items via **Clerk User IDs** (Immutable) while keeping emails only for display purposes. This ensures data integrity even if user profile details change.
