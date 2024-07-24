# ResearchSphere Backend

**ResearchSphere** is a platform designed to bridge the gap between students seeking research/project opportunities and professors offering such opportunities.

## Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## Getting Started

Follow these steps to set up the project locally:

1. **Clone the Repository**

   First, clone the repository to your local machine:

   ```bash
   git clone https://github.com/kishanlalchoudhary/ResearchSphere-Backend.git

2. **Navigate to the Project Directory**

   Change to the project directory:

   ```bash
   cd researchsphere-backend

3. **Install Dependencies**

   Install the required Node.js packages by running:

   ```bash
   npm install

4. **Configure Environment Variables**

   The project includes an env.example file that provides a template for the environment variables. To configure your environment, follow these steps:

   - Copy the `env.example` file to create a `.env` file:

     ```bash
     cp env.example .env
     ```

   - Open the `.env` file and update it with your configuration details:

     ```env
     PORT=8000
     MONGO_URI=mongodb://localhost:27017
     DB_NAME=research-sphere
     FRONTEND_URL=http://localhost:3000
     JWT_SECRET_KEY=your_jwt_secret_key
     SALT=your_salt_value
     SMTP_HOST=smtp.your-email-provider.com
     SMTP_USERNAME=your_email_username
     SMTP_PASSWORD=your_email_password
     ```

5. **Start the Server**

   To start the server, use the following command:

   ```bash
   npm start

## Technologies and Packages Used

- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **jsonwebtoken (JWT)**: For creating and verifying JSON Web Tokens.
- **bcrypt**: For hashing passwords.
- **nodemailer**: For sending emails.
- **morgan**: HTTP request logger middleware.
- **validator**: For string validation and sanitization.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **express-async-handler**: Middleware for handling asynchronous errors in Express.
- **nodemon**: For automatically restarting the server during development.
