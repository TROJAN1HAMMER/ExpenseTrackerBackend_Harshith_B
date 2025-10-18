# 💰 Expense Tracker API — Backend (KonnichiWow Intern Task)

## 🚀 Overview

A complete **Node.js + Express + MongoDB + Firebase** backend for an Expense Tracker application. Features include:

* User authentication using Firebase
* CRUD operations for expenses
* Monthly and category-based reports
* Swagger documentation (OpenAPI 3.0)
* Express validation and middleware
* Token-based authentication and logout
* Filtering and sorting
* Global error handling

---

## 🧩 Tech Stack

* **Language / Runtime:** JavaScript (Node.js)
* **Framework:** Express.js
* **Database:** MongoDB + Mongoose
* **Authentication:** Firebase Authentication (Admin SDK)
* **Validation:** express-validator
* **Documentation:** Swagger (OpenAPI 3.0)
* **Environment Variables:** dotenv

---

## 📂 File Structure

```
src/
 ├── app.js
 ├── server.js
 ├── routes/
 │   ├── auth/
 │   │   └── authRoutes.js
 │   ├── expenses/
 │   │   └── expenseRoutes.js
 │   ├── reports/
 │   │   └── reportRoutes.js
 │   └── index.js
 ├── controllers/
 │   ├── authController.js
 │   ├── expenseController.js
 │   └── reportController.js
 ├── middleware/
 │   ├── authMiddleware.js
 │   ├── validationMiddleware.js
 │   └── errorMiddleware.js
 ├── models/
 │   ├── Expense.js
 │   └── User.js
 ├── firebase/
 │   └── firebaseAdmin.js
 └── swagger.js
```

---

## 🔧 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/TROJAN1HAMMER/ExpenseTrackerBackend_Harshith_B.git
cd ExpenseTrackerBackend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Environment Variables

Create a `.env` file in the root with required variables (MongoDB URI, Firebase credentials, etc.)

### 4. Add Firebase Credentials

* Download the Firebase service account JSON from Firebase Console → Project Settings → Service Accounts → Generate New Private Key
* Save it as `src/firebase/serviceAccountKey.json`

### 5. Run the Server

```bash
npm run dev
```

Server runs at: `http://localhost:5001`

---

## 🧠 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint      | Description                           |
| ------ | ------------- | ------------------------------------- |
| POST   | /api/register | Register a new user                   |
| POST   | /api/login    | Log in user, return Firebase token    |
| POST   | /api/logout   | Revoke user’s Firebase token (logout) |

### 💸 Expense Routes

| Method | Endpoint          | Description                        |
| ------ | ----------------- | ---------------------------------- |
| GET    | /api/expenses     | Fetch all expenses (filter & sort) |
| GET    | /api/expenses/:id | Fetch a single expense by ID       |
| POST   | /api/expenses     | Add a new expense                  |
| PUT    | /api/expenses/:id | Update an existing expense         |
| DELETE | /api/expenses/:id | Delete an expense                  |

**Query Parameters for GET /api/expenses:**

| Parameter | Type   | Description                   | Example                              |
| --------- | ------ | ----------------------------- | ------------------------------------ |
| category  | string | Filter by category            | `/api/expenses?category=Food`        |
| minAmount | number | Minimum expense amount        | `/api/expenses?minAmount=100`        |
| maxAmount | number | Maximum expense amount        | `/api/expenses?maxAmount=500`        |
| startDate | date   | Start date (YYYY-MM-DD)       | `/api/expenses?startDate=2025-10-01` |
| endDate   | date   | End date (YYYY-MM-DD)         | `/api/expenses?endDate=2025-10-31`   |
| sort      | string | Sort by a field (amount/date) | `/api/expenses?sort=amount`          |
| order     | string | Sort order (asc/desc)         | `/api/expenses?sort=date&order=desc` |

### 📊 Report Routes

| Method | Endpoint              | Description                     | Query Params         |
| ------ | --------------------- | ------------------------------- | -------------------- |
| GET    | /api/reports/monthly  | Get monthly aggregated report   | `month=MM&year=YYYY` |
| GET    | /api/reports/category | Get report filtered by category | `category=Food`      |

---

## 🧪 Postman Collection

* File: `Expense Tracker API.postman_collection.json`
* Preconfigured requests for all endpoints: `/register`, `/login`, `/expenses`, `/logout`, `/reports`

---

## 🔗 URLs

* **Swagger Documentation:** `http://localhost:5001/api-docs`
* **API Base URL:** `http://localhost:5001/api`

---

## 🏁 Conclusion

You now have a fully functional, production-ready **Expense Tracker Backend** with:

* Firebase authentication
* CRUD for expenses
* Reports
* Swagger documentation
* Filtering, sorting, and error handling

**Bonus Features (Brownie Points):**

* Middleware for auth validation
* Input validation with express-validator
* Clean modular structure
* Meaningful variable names & comments
* Aggregation-based monthly reports

---
