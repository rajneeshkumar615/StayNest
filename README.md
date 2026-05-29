# StayNest 🏡

A full-stack property rental platform built with **Node.js, Express.js, MongoDB Atlas, Passport.js, Cloudinary, and EJS**. StayNest allows users to browse listings, create and manage properties, upload images, leave reviews, and securely authenticate through a session-based login system.

---

## 🚀 Overview

StayNest is a full-stack web application inspired by modern property rental platforms. The project focuses on backend architecture, authentication, authorization, cloud image uploads, database management, and server-side rendering.

Users can:

* Explore rental listings
* Create property listings
* Upload property images
* Edit and delete their own listings
* Add and delete reviews
* Sign up and log in securely
* Manage content through protected routes

---

## ✨ Features

### Authentication & Security

* User Signup & Login
* Session-based Authentication
* Passport.js Integration
* Authorization Middleware
* Listing Ownership Verification
* Protected Routes

### Listings

* Create New Listings
* View All Listings
* Edit Existing Listings
* Delete Listings
* Category-Based Filtering

### Reviews

* Add Reviews
* Delete Reviews
* Review Authorization

### Media Uploads

* Cloudinary Image Storage
* Multer File Upload Handling
* Optimized Image Management

### User Experience

* Flash Messages
* Responsive UI
* Server-Side Rendering with EJS
* Clean MVC Architecture

---

## 🛠 Tech Stack

### Backend

* Node.js
* Express.js

### Frontend

* EJS
* HTML5
* CSS3
* Bootstrap
* JavaScript

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* Passport.js
* Passport Local
* Passport Local Mongoose

### Cloud Services

* Cloudinary
* Multer Storage Cloudinary

### Additional Packages

* Express Session
* Connect Flash
* Method Override
* dotenv

---

## 📂 Project Structure

```bash
StayNest
│
├── controllers/
├── init/
├── models/
├── public/
│   ├── css/
│   └── js/
├── routes/
├── utils/
├── views/
│
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### Clone Repository

```bash
git clone https://github.com/rajneeshkumar615/StayNest.git
cd StayNest
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8080

MONGO_URI=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### Seed Database

```bash
npm run seed
```

### Run Application

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

Application URL:

```txt
http://localhost:8080
```

---

## 📸 Screenshots

Add screenshots here after deployment.

Example:

* Home Page
* Listings Page
* Listing Details Page
* Login Page
* Create Listing Page

---

## 🔮 Future Improvements

* Booking System
* Wishlist Functionality
* Map Integration
* Advanced Search & Filters
* Payment Gateway Integration
* Real-Time Notifications
* React Frontend Migration

---

## 👨‍💻 Author

**Rajneesh Kumar**

Final-Year BCA Student | Full Stack Developer

Tech Interests:

* Backend Development
* Full Stack Engineering
* System Design
* Scalable Web Applications

GitHub:
https://github.com/rajneeshkumar615

---

## 📄 License

This project is licensed under the MIT License.
