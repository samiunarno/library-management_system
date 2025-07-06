<div align="center">

# 📚 Minimal Library Management System

A full-stack project built with **React, Redux Toolkit Query (RTK Query), TypeScript** on the frontend and **Node.js, Express.js, MongoDB** on the backend.

</div>

---

## 🚀 Live Demo

<div align="center">
  <a href="https://your-vercel-deployment-link.com" target="_blank">
    <img src="https://img.shields.io/badge/Live-Demo-green?style=for-the-badge&logo=vercel" alt="Live Demo"/>
  </a>
</div>

---

## 🛠 Features

### ✅ Public Access
- No login or authentication required
- All features are accessible to the public

### 📘 Book Management
- View all books in a table
- Add new book
- Edit and delete book
- Mark books as unavailable when copies = 0

### 📖 Borrow Book
- Borrow books with quantity and due date
- Quantity cannot exceed available copies
- Auto-mark as unavailable if copies reach 0

### 📊 Borrow Summary
- Aggregated borrow summary by book
- Shows book title, ISBN, and total quantity borrowed

---

## 🧭 Pages & Routes

| Route | Description |
|-------|-------------|
| `/books` | View all books |
| `/create-book` | Add a new book |
| `/books/:id` | View a single book |
| `/edit-book/:id` | Edit a book |
| `/borrow/:bookId` | Borrow a specific book |
| `/borrow-summary` | View borrowed books summary |

---

## 🧩 Tech Stack

| Layer       | Technology |
|-------------|------------|
| Frontend    | React, TypeScript |
| State       | Redux Toolkit, RTK Query |
| Styling     | Tailwind CSS |
| Backend     | Node.js, Express.js |
| Database    | MongoDB with Mongoose |

---

## 🗃 Backend Overview

### ✅ Modular MVC Structure

- **Models**: Book and Borrow schemas
- **Controllers**: All business logic
- **Routes**: Cleanly separated routes
- **Interfaces**: TypeScript interfaces for safety
- **Pagination**: Supported on book listings

### 📚 Book Model Fields

```ts
{
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}
