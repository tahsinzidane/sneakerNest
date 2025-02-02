# SneakerNest 🛍️  

**SneakerNest** is a single-vendor e-commerce platform for selling sneakers, hoodies, and full-sleeve T-shirts, especially designed for the winter season. This project serves as a **backend development challenge**, testing my ability to implement **server-side logic, database management, authentication, and e-commerce functionalities**.  

---

## 🚀 Current Status  

This project is still **under development**, with the backend being the primary focus. While several features are functional, improvements and refinements are ongoing to make the platform more robust and scalable.  

---

## 📖 Table of Contents  

- [💡 Why This Project?](#-why-this-project)  
- [⚙️ Code Structure & Explanation](#️-code-structure--explanation)  
- [🛠️ Features Implemented](#-features-implemented)  
- [💻 Local Setup & Installation](#-local-setup--installation)  
- [📌 Future Improvements](#-future-improvements)  
- [🤝 Contribution](#-contribution)  
- [📝 License](#-license)  

---

## 💡 Why This Project?  

I created **SneakerNest** to strengthen my **backend development** skills by:  

✅ Implementing **RESTful APIs** with Express.js  
✅ Managing **MongoDB** for storing products, users, and orders  
✅ Handling **user authentication** with Passport.js  
✅ Developing an **add-to-cart** and order management system  
✅ Learning how to structure a scalable backend for an e-commerce store    

---

## ⚙️ Code Structure & Explanation  

The `app.js` file serves as the **main entry point** for the SneakerNest application. It is responsible for **configuring the server, initializing middleware, setting up database connections, and defining routes**. Below is a **section-wise breakdown** of the code.  

---

### 1️⃣ **Loading Required Dependencies**  

At the beginning of the file, we import the necessary **libraries** and **modules**:  

```javascript
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const MongoStore = require('connect-mongo');
```

✅ **Purpose of Each Dependency**:  
- `dotenv`: Loads environment variables from a `.env` file.  
- `express`: The core web framework for handling routes and middleware.  
- `session`: Manages user sessions.  
- `mongoose`: Connects to the MongoDB database.  
- `passport`: Handles user authentication.  
- `flash`: Enables flash messages for showing success/error messages.  
- `LocalStrategy`: A strategy for local authentication (username & password).  
- `path`: Provides utilities for working with file and directory paths.  
- `helmet`: Helps secure Express apps by setting various HTTP headers.  
- `compression`: Reduces the size of response bodies to improve performance.  
- `connect-mongo`: Stores session data in MongoDB to persist login sessions.  

---

### 2️⃣ **Importing Mongoose Models**  

We import all **Mongoose models** required for the application:  

```javascript
const User = require('./models/User');
const Product = require('./models/Product');
const LandingPage = require('./models/setupLandingPage');
const Orders = require('./models/order');
const Cart = require('./models/cart');
```

✅ **Purpose**: These models define how data is structured and stored in MongoDB.  

---

### 3️⃣ **Initializing Express App**  

```javascript
const app = express();
```
✅ **Purpose**: This creates an Express application instance.  

---

### 4️⃣ **Database Connection**  

```javascript
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/sneakernest';
require('./config/db'); // Separate file for database connection
```

✅ **Purpose**:  
- `mongoUri` is set using an environment variable, with a default **local MongoDB URI**.  
- Database connection is handled in `./config/db.js` for **better separation of concerns**.  

---

### 5️⃣ **Setting Up Middleware**  

#### **View Engine & Static Files**  

```javascript
app.set('view engine', 'ejs');  
app.use(express.static(path.join(__dirname, 'public')));  
app.use('/uploads', express.static('uploads'));  
app.use(express.urlencoded({ extended: false }));  
```
✅ **Purpose**:  
- `view engine`: Uses **EJS** as the templating engine for rendering views.  
- `express.static()`: Serves static files from the **public** and **uploads** directories.  
- `express.urlencoded()`: Parses form data in `application/x-www-form-urlencoded` format.  

#### **Security & Performance Enhancements**  

```javascript
app.use(helmet());  
app.use(compression());  
```
✅ **Purpose**:  
- `helmet()`: Protects against security vulnerabilities.  
- `compression()`: Reduces response size for **faster load times**.  

#### **Session & Authentication Configuration**  

```javascript
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: mongoUri,  
    collectionName: 'sessions'
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',  
    httpOnly: true,  
    maxAge: 24 * 60 * 60 * 1000,  
  },
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
```
✅ **Purpose**:  
- Stores session data **in MongoDB** to persist login sessions.  
- Uses **Passport.js** for user authentication.  
- `flash()`: Enables flash messages for user notifications.  

---

### 6️⃣ **Passport Configuration**  

```javascript
require('./config/passport');
```
✅ **Purpose**: Handles **user authentication logic** (e.g., login, registration) in a **separate configuration file**.  

---

### 7️⃣ **Defining Routes**  

```javascript
app.use('/', require('./routes/home'));
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/api/up-product', require('./routes/products'));
app.use('/api/landingPageSetup', require('./routes/setupLandingPage'));
app.use(require('./routes/searchProduct'));
app.use(require('./routes/order'));
app.use('/cart', require('./routes/tocart'));
```
✅ **Purpose**:  
- `/`: Home route  
- `/auth`: Handles user authentication (login, register, logout)  
- `/users`: Handles user-related routes  
- `/api/up-product`: API for managing product uploads  
- `/api/landingPageSetup`: API for setting up the landing page  
- `/searchProduct`: Handles product search functionality  
- `/order`: Manages order processing  
- `/cart`: Handles cart functionalities  

---



### 9️⃣ **Error Handling Middleware**  

```javascript
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```
✅ **Purpose**:  
- Catches **server errors** and logs them.  
- Returns a **500 Internal Server Error** response.  

---

### 🔟 **Starting the Server**  

```javascript
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
```
✅ **Purpose**:  
- Starts the Express server on **port 3000** (default) or **custom port from `.env`**.  
- Displays a message with the **server URL**.  

---

## 🔥 Summary  

📌 **Separation of Concerns**:  
- **Routes** are modularized.  
- **Database connection** is in a separate file.  
- **Passport.js configuration** is isolated.  

📌 **Security & Optimization**:  
- **Helmet.js** for security.  
- **Compression** for faster response times.  
- **MongoDB session storage** for authentication persistence.  

📌 **Scalability & Maintainability**:  
- Uses `express-session` with **MongoDB storage**.  
- Middleware is **well-structured and organized**.  
- Admin dashboard fetches **real-time** user, product, and order data.  

---

## 🛠️ Features Implemented  

- 🔹 **User Authentication** (Passport.js, Sessions)  
- 🛒 **Add to Cart System** (Stored in DB)  
- 🛍️ **Product Management** (CRUD operations for sneakers & clothing)  
- 🛎️ **Order Handling** (Placing and tracking orders)  
- 📡 **REST API for Frontend Integration**  

---

## 💻 Local Setup & Installation  

### Prerequisites  

- **Node.js** (v14 or higher)  
- **MongoDB** (local or MongoDB Atlas)  

### Steps to Set Up Locally  

1️⃣ **Clone the Repository**  
```bash
git clone https://github.com/tahsinzidane/sneakerNest.git
cd sneaker-nest
```

2️⃣ **Install Dependencies**  
```bash
npm install
```

3️⃣ **Set Up Environment Variables**  
Create a `.env` file and add the following:  
```env
PORT=4000
MONGO_URI=mongodb://localhost:27017/sneakernest
SESSION_SECRET=your-secret-key
```

4️⃣ **Start the Server**  
```bash
npm start
```
Visit `http://localhost:4000` in your browser.  

---

## 📌 Future Improvements  

🔹 **Payment Gateway Integration** (Stripe, PayPal)  
🔹 **Admin Dashboard for Managing Products**  
🔹 **Wishlist Feature**  
🔹 **Order Tracking System**  
🔹 **Cloud Image Storage (Cloudinary/AWS S3)**  

---

## 🤝 Contribution  

Want to contribute? Follow these steps:  

1. Fork the repository 🍴  
2. Create a new feature branch (`git checkout -b feature-name`)  
3. Commit changes (`git commit -m "Added new feature"`)  
4. Push to your fork (`git push origin feature-name`)  
5. Open a **Pull Request** ✅  

---

## 📝 License  

This project is licensed under the [MIT License](/LICENSE).  
