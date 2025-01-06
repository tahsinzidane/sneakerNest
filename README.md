# SneakerNest 🛍️  

**SneakerNest** is a single-vendor e-commerce platform designed for selling sneakers, hoodies, and full-sleeve T-shirts during winter. The primary purpose of this project is to test my backend development skills and explore how well I can handle server-side functionality, database integration, and user authentication.  

---

## Current Status  

This project is a **work in progress**, and the backend is the main area of focus. While the basic structure and features are functional, there’s still a lot to improve and polish before it can be considered complete.  

---

## Key Highlights  

- **Dynamic Product Management**: Products can be displayed with details like price, description, stock availability, and tags.  
- **Authentication**: Basic user login and registration using Passport.js (local strategy and Google OAuth).  
- **Backend Focus**: Testing my abilities in building APIs, integrating MongoDB, and implementing secure features.  
- **Templating**: Using EJS for server-side rendering to dynamically display data.  
-----


## Local Setup

Before running **SneakerNest** locally, ensure you have the following prerequisites:

### Prerequisites

- **Node.js** (version 14 or higher)
- **MongoDB** (locally or use MongoDB Atlas)

### Steps to Set Up Locally

1. **Clone the Repository**  
   Clone the project repository to your local machine:
   ```bash
   git clone https://github.com/tahsinzidane/sneakerNest.git
   cd sneakernest
   ```

2. **Install Dependencies**  
   Run the following command to install the necessary dependencies:
   ```bash
   npm install
   ```

3. **Environment Variables**  
   Create a `.env` file in the root directory and add the following variables:
   - **PORT**: Port number (default: `4000`)
   - **MONGO_URI**: Your MongoDB connection URI
   - **SESSION_SECRET**: A secret key for session management

   Example:
   ```env
   PORT=4000
   MONGO_URI=mongodb://localhost:27017/sneakernest
   SESSION_SECRET=your-session-secret
   ```

4. **Start the Server**  
   After setting up the environment variables, run the following command to start the application:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:4000`.

5. **Access the Application**  
   Open a browser and visit `http://localhost:4000` to access the SneakerNest application.

---

### Additional Information  

- **Database**: MongoDB is used as the database for storing product and user data.
- **Testing**: You can run the application to test backend functionality, such as adding products,registering users, etc.

---

## License
this project under the [mit License](/LICENSE)
