# 📰 The Press — MERN Blog App

A full-stack blog application built with **MongoDB, Express, React, and Node.js**.

## Features

- ✅ Create, read, update, delete blog posts
- 🔍 Real-time search across titles, content, and authors
- 🏷️ Tag posts and filter by tag
- 🖼️ Optional cover image via URL
- 📱 Responsive design

## Project Structure

```
blog-app/
├── server/               # Express + MongoDB API
│   ├── models/Post.js    # Mongoose schema
│   ├── routes/posts.js   # REST endpoints
│   ├── index.js          # Entry point
│   └── .env.example      # Environment variables template
├── client/               # React frontend
│   ├── src/
│   │   ├── pages/        # Home, PostDetail, NewPost, EditPost
│   │   ├── components/   # Navbar, PostCard, PostForm
│   │   ├── api.js        # Fetch helper
│   │   └── App.js        # Router
│   └── public/
└── package.json          # Root scripts
```

## Prerequisites

- Node.js v16+
- MongoDB running locally on port 27017 (or a MongoDB Atlas URI)

## Getting Started

### 1. Install dependencies

```bash
npm install          # root (concurrently)
npm install --prefix server
npm install --prefix client
```

Or use the shortcut:

```bash
npm run install:all
```

### 2. Configure the server

```bash
cp server/.env.example server/.env
```

Edit `server/.env` if you want to use a different MongoDB URI or port:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/blogapp
```

### 3. Run both servers

```bash
npm run dev
```

- React frontend: http://localhost:3000
- Express API: http://localhost:5000

## API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | /api/posts            | Get all posts (+ search) |
| GET    | /api/posts/:id        | Get single post          |
| POST   | /api/posts            | Create a post            |
| PUT    | /api/posts/:id        | Update a post            |
| DELETE | /api/posts/:id        | Delete a post            |
| GET    | /api/health           | Health check             |

### Query params for GET /api/posts
- `?search=keyword` — search title, content, author
- `?tag=tech` — filter by tag
