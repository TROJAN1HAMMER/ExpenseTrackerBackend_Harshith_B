Expense Tracker Backend
Project Overview

This is the backend API for an Expense Tracker application built with Node.js, Express.js, MongoDB, and Firebase Authentication.
It allows users to register, login, manage expenses, and generate expense reports. All API endpoints are fully documented with Swagger and validated using express-validator.

Tech Stack

Language: JavaScript (Node.js)

Framework: Express.js

Authentication: Firebase Authentication (Email/Password)

Database: MongoDB (Mongoose)

Testing Tool: Postman

Features

User registration and login via Firebase

CRUD operations for expenses

Monthly and category-wise expense reports

Input validation using express-validator

Authentication middleware for protected routes

Swagger-based API documentation

Custom global error-handling middleware

Modular and clean folder structure

Folder Structure
ExpenseTrackerBackend/
│
├─ src/
│  ├─ controllers/
│  │   ├─ authController.js
│  │   ├─ expenseController.js
│  │   └─ reportController.js
│  ├─ routes/
│  │   ├─ auth/
│  │   │   └─ authRoutes.js
│  │   ├─ expenses/
│  │   │   └─ expenseRoutes.js
│  │   ├─ reports/
│  │   │   └─ reportRoutes.js
│  │   └─ index.js
│  ├─ middleware/
│  │   ├─ authMiddleware.js
│  │   ├─ errorMiddleware.js
│  │   └─ validationMiddleware.js
│  ├─ models/       # Mongoose models
│  ├─ firebase/     # Firebase config
│  ├─ swagger.js
│  └─ app.js
├─ package.json
├─ .env
├─ README.md
└─ postman_collection.json

Setup Instructions
1. Clone the Repository
git clone https://github.com/<YourUsername>/ExpenseTrackerBackend_Harshith_B.git
cd ExpenseTrackerBackend_Harshith_B

2. Install Dependencies
npm install

3. Create .env File

Create a .env file in the root directory with the following:

MONGO_URI=<your_mongodb_connection_string>
FIREBASE_API_KEY=<your_firebase_api_key>
FIREBASE_AUTH_DOMAIN=<your_firebase_auth_domain>
FIREBASE_PROJECT_ID=<your_firebase_project_id>
FIREBASE_STORAGE_BUCKET=<your_firebase_storage_bucket>
FIREBASE_MESSAGING_SENDER_ID=<your_sender_id>
FIREBASE_APP_ID=<your_app_id>

Running the Server
Development
npm run dev


This uses nodemon for hot-reloading.

Production
npm start


The server will run on http://localhost:5000/ by default.

API Routes
Auth
Endpoint	Method	Auth	Description
/auth/register	POST	No	Register a new user
/auth/login	POST	No	Login user and return Firebase token
Expenses
Endpoint	Method	Auth	Description
/expenses	GET	Yes	Fetch all expenses
/expenses	POST	Yes	Add a new expense
/expenses/:id	PUT	Yes	Update an expense
/expenses/:id	DELETE	Yes	Delete an expense
Reports
Endpoint	Method	Auth	Description
/reports/monthly	GET	Yes	Get monthly expense summary
/reports/category	GET	Yes	Get expenses by category
Swagger Documentation

Once the server is running, visit:

http://localhost:5000/api-docs


You will find interactive API documentation with request/response examples, authentication info, and validation hints.

Error Handling

All errors are returned in a structured JSON format:

{
  "status": "error",
  "message": "Error description"
}


Validation errors:

{
  "status": "error",
  "errors": [
    { "field": "email", "message": "Must be a valid email" },
    { "field": "password", "message": "Password must be at least 6 characters" }
  ]
}

Postman Collection

A Postman collection is included (postman_collection.json) to test all endpoints. Import it into Postman and test both success and failure cases.

Optional Enhancements / Brownie Points

Input validation via express-validator

Authentication middleware for route protection

Global error-handling middleware

Modular folder structure and meaningful variable names

Aggregation-based monthly reports

Optional filtering/sorting routes can be added for /expenses

License

This project is for educational purposes. Modify and use freely.