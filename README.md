# 🛒 Online Shop – Backend System (Node.js & Express)

A **backend‑focused online shop application** built with **Node.js**, **Express**, and **MongoDB**.  
The project implements **authentication**, **role‑based authorization**, **cart & order workflows**, and **secure data handling**.

Server‑rendered **EJS templates** are used **only** to validate and visualize backend logic.

⚠️ **Project focus:** Backend engineering, not frontend/UI.

---

## 🎯 Project Goal

The goal of this project is to build a **secure and well‑structured backend system** for an online shop, focusing on:

- Authentication and authorization
- Role‑based access control
- Business logic enforcement
- Secure data flow and isolation
- Clean backend architecture (MVC)

---

## 🚀 Features

### 🔐 Authentication & Authorization

- User signup & login using **JWT**
- JWT stored securely in **HTTP‑only cookies**
- Role‑based access control:
  - Customer
  - Provider
- Protected routes & ownership checks

---

### 👥 Roles & Permissions

| Role     | Capabilities |
|----------|--------------|
| Customer | Browse products, add to cart, place & cancel orders |
| Provider | Add, edit, delete **own** products |
| Guest    | Browse products only |

---

### 📦 Products

- Add new products (**providers only**)
- Upload product images (**Multer + MongoDB**)
- Category‑based filtering
- Product ownership enforcement
- Public product image access

---

### 🛒 Cart System

- Add products to cart
- Update quantities
- Remove single item
- Clear entire cart
- Cart data strictly scoped per user

---

### 📑 Orders

- Confirm orders from cart
- Store shipping details
- Order status lifecycle:
  - Pending
  - Canceled
- Cancel **only own pending orders**
- Orders scoped strictly to authenticated users

---

## 🛡️ Security & Data Integrity

- Never trust client‑sent price data
- Server‑side validation for:
  - Quantity
  - Price
  - Stock
  - Categories
- User‑scoped database queries
- Centralized error handling
- Prevents data leakage between users

---

## 🧠 Backend Architecture

```text
ONLINE-SHOP/
├── controllers/      # Route logic (business rules)
├── routes/           # Express route definitions
├── models/           # Mongoose schemas
├── middlewares/      # Auth, role checks, uploads, error handling
├── utils/            # Async wrapper, custom error classes
├── views/            # EJS templates (presentation only)
├── public/           # Static assets
├── db/               # Database connection
├── app.js            # App configuration
└── package.json
```

- Separation of concerns
- MVC architecture
- Backend‑first design

---

## ⚙️ Tech Stack

- Node.js
- Express (v5)
- MongoDB
- Mongoose
- EJS (server‑side rendering)
- JSON Web Tokens (JWT)
- Multer (file uploads)
- bcrypt
- dotenv

---

## 🧪 Error Handling Strategy

- Centralized error handling middleware
- Custom error classes (`AppError`)
- Async controller wrapper to avoid unhandled promise rejections
- Graceful error pages for browser users

---

## 🧾 Environment Variables

- Create a `.env` file in the project root
- Required variables:
  - `MONGO_URI`
  - `JWT_SECRET`

- Example:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
---

## ▶️ Running the Project Locally

- Install dependencies:
```
npm install
```
Start development server:
```
npm run dev
```
Or start production server:
```
npm start
```
Server runs at:

http://localhost:3000

🧑‍💻 Author
- Mohammed Hossam
