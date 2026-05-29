# StayNest – Property Rental Platform

<<<<<<< HEAD
A full-stack property rental platform built with Node.js, Express.js, MongoDB, and EJS. StayNest allows users to explore listings, create property posts, upload images, manage their own listings, and add reviews through a clean server-rendered interface.

---

## Overview

StayNest is a full-stack web application focused on backend architecture, authentication, database operations, cloud image uploads, and dynamic server-side rendering.

The project demonstrates how a real listing-based application works, including user authentication, CRUD operations, protected routes, listing ownership, reviews, flash messages, and responsive UI pages.

---

## Tech Stack

* **Backend:** Node.js, Express.js
* **Frontend:** EJS, HTML5, CSS3, Bootstrap
* **Database:** MongoDB, Mongoose
* **Authentication:** Passport.js, Passport Local, Passport Local Mongoose
* **Image Uploads:** Cloudinary, Multer Storage Cloudinary
* **Utilities:** Express Session, Connect Flash, Method Override, dotenv

---

## Features

* User signup, login, and logout
* Authentication and authorization for protected actions
* Create, read, update, and delete property listings
* Cloud-based image upload support with Cloudinary
* Add and delete reviews
* Listing ownership checks
* Server-side rendered dynamic pages using EJS
* Flash messages for success and error states
* Responsive user interface
* RESTful routing structure

---

## Project Structure
=======
A full-stack property rental platform built with Node.js, Express.js, MongoDB, and EJS that allows users to explore, create, and manage property listings through a clean and responsive interface.

---

## 🚀 Overview

StayNest is a full-stack web application inspired by modern property rental platforms. The project focuses on backend architecture, authentication workflows, database management, cloud image uploads, and dynamic server-side rendering.

The application allows users to browse rental listings, upload property images, create and manage listings securely, and interact with a responsive user interface.

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js

### Frontend

* EJS (Embedded JavaScript Templates)
* HTML5
* CSS3
* JavaScript

### Database

* MongoDB
* Mongoose

### Additional Tools & Services

* Cloudinary (Image Uploads)
* Multer
* Passport.js Authentication
* Express Session
* Connect Flash
* Method Override

---

## ✨ Features

* Secure user authentication and authorization
* Create, edit, and delete property listings
* Cloud-based image upload integration
* Dynamic server-side rendered pages using EJS
* Responsive user interface
* RESTful routing architecture
* Flash messaging and session handling
* MongoDB database integration

---

## 📂 Project Structure
>>>>>>> 8d8a49c0426d2d3a30f2da8c7b12b6a1cd19ce35

```bash
.
├── app.js
<<<<<<< HEAD
├── cloudConfig.js
├── middleware.js
├── schema.js
├── package.json
├── package-lock.json
├── controllers/
├── init/
├── models/
├── public/
├── routes/
├── utils/
└── views/
=======
├── package.json
├── cloudConfig.js
├── models/
├── routes/
├── controllers/
├── views/
├── public/
├── utils/
├── middleware/
└── init/
>>>>>>> 8d8a49c0426d2d3a30f2da8c7b12b6a1cd19ce35
```

---

<<<<<<< HEAD
## Installation & Setup

### 1. Clone the repository
=======
## ⚙️ Installation & Setup

### 1. Clone the Repository
>>>>>>> 8d8a49c0426d2d3a30f2da8c7b12b6a1cd19ce35

```bash
git clone https://github.com/rajneeshkumar615/StayNest.git
cd StayNest
```

<<<<<<< HEAD
### 2. Install dependencies
=======
### 2. Install Dependencies
>>>>>>> 8d8a49c0426d2d3a30f2da8c7b12b6a1cd19ce35

```bash
npm install
```

<<<<<<< HEAD
### 3. Create environment variables
=======
### 3. Configure Environment Variables
>>>>>>> 8d8a49c0426d2d3a30f2da8c7b12b6a1cd19ce35

Create a `.env` file in the root directory and add:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret

<<<<<<< HEAD
CLOUD_NAME=your_cloudinary_cloud_name
=======
CLOUD_NAME=your_cloudinary_name
>>>>>>> 8d8a49c0426d2d3a30f2da8c7b12b6a1cd19ce35
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

<<<<<<< HEAD
For local development, if `ATLASDB_URL` is not provided, the app can fall back to a local MongoDB database.

### 4. Start the application

For production:
=======
### 4. Run the Application
>>>>>>> 8d8a49c0426d2d3a30f2da8c7b12b6a1cd19ce35

```bash
npm start
```

<<<<<<< HEAD
For development:

```bash
npm run dev
```

The application runs on:

```bash
http://localhost:8080
=======
The application will run on:

```bash
http://localhost:3000
>>>>>>> 8d8a49c0426d2d3a30f2da8c7b12b6a1cd19ce35
```

---

<<<<<<< HEAD
## Future Improvements

* Deployment on a cloud platform
* Advanced search and filtering
* Booking flow
* Wishlist functionality
* Map/location integration
* Payment gateway integration
* React frontend migration

---

## Author

**Rajneesh Kumar**

Backend and full-stack developer focused on Node.js, Express.js, MongoDB, and practical web application development.

---

## License

This project is licensed under the MIT License.
=======
## 📸 Future Improvements

* React-based frontend migration
* Advanced search and filtering
* Wishlist & booking features
* Payment integration
* Deployment optimization

---

## 👨‍💻 Author

Rajneesh Kumar

* Backend & Full Stack Developer
* Focused on Node.js, Express.js, MongoDB, and scalable web applications

---

## 📌 Note

This project was built for learning and practicing full-stack development concepts including backend architecture, authentication systems, cloud integration, and database management.
>>>>>>> 8d8a49c0426d2d3a30f2da8c7b12b6a1cd19ce35
