# ResearchSphere Backend

The ResearchSphere Backend provides secure and reliable server-side functionality for the **ResearchSphere** platform. Using the MVC (Model-View-Controller) architecture, it efficiently handles data and user interactions. Designed for optimal performance and scalability, the backend ensures a smooth and secure experience for all users.

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
   cd ResearchSphere-Backend

3. **Install Dependencies**

   Install the required Node.js packages by running:

   ```bash
   npm install

4. **Configure Environment Variables**

   The project includes an env.example file that provides a template for the environment variables. To configure your environment, follow these steps:

   - Copy the `env.example` file to create a `.env` file:

   - Open the `.env` file and add your configuration details:

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
