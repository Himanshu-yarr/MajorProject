# Wanderlust

A full-stack travel listing web application inspired by Airbnb, where users can create, edit, review, and manage travel stay listings with secure authentication and image uploads.

---

## Features

- User Authentication & Authorization
- Create, Edit & Delete Listings
- Add & Delete Reviews
- Secure Login & Signup System
- Image Upload using Cloudinary
- Flash Messages for User Feedback
- Form Validation using Joi
- Server-side Rendering with EJS
- RESTful Routing
- MVC Architecture
- Responsive UI using Bootstrap

---

## Tech Stack

### Frontend

- HTML
- CSS
- Bootstrap
- JavaScript
- EJS
- EJS-Mate

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication & Sessions

- Passport.js
- passport-local
- express-session
- connect-flash

### File Upload & Cloud Storage

- Multer
- Cloudinary
- multer-storage-cloudinary

### Validation & Utilities

- Joi
- Method-Override

---

## 📂 Project Structure

```bash
wanderlust/
│
├── controllers/
├── models/
├── routes/
├── views/
├── public/
├── utils/
├── init/
├── middleware.js
├── cloudConfig.js
├── app.js
├── schema.js
└── README.md
```

---

## Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Himanshu-yarr/MajorProject.git
```

### 2️⃣ Open Project

```bash
cd MajorProject
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Setup Environment Variables

Create a `.env` file in root folder and add:

```env
ATLASDB_URL=your_mongodb_url
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_secret
SECRET=your_session_secret
```

---

## ▶️ Run Project

```bash
node app.js
```

OR (recommended)

```bash
nodemon app.js
```

Server will run on:

```bash
http://localhost:8080
```

---

## Key Concepts Implemented

### Authentication

Used Passport.js with passport-local strategy for secure user authentication and session handling.

### MVC Architecture

Separated project into Models, Views, Controllers, and Routes for better scalability and maintainability.

### Image Upload Flow

Used Multer middleware to process image uploads and Cloudinary for cloud image storage.

### Validation

Implemented server-side validation using Joi before storing data in MongoDB.

### Session Management

Used express-session and connect-flash to maintain login sessions and display flash messages.

---

## Main Functionalities

- Users can register and login
- Users can create listings
- Users can upload listing images
- Users can edit and delete their own listings
- Users can add reviews
- Users can delete reviews
- Flash messages for actions
- Responsive design for all devices

---

## Security Features

- Server-side validation
- Authentication checks
- Authorization middleware
- Protected routes
- Secure session handling

---

## Future Improvements

- Search & Filters
- Maps Integration
- Booking System
- Payment Gateway
- User Profile Page
- Favorites/Wishlist
- Rating Analytics

---

## Author

Himanshu Joshi

B.Tech CSE Student  
MERN Stack & Full Stack Development Enthusiast

---
