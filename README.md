# 📚 Knowledge Sharing Platform with AI Assist

> A modern full-stack knowledge sharing platform with AI-powered content generation using Google Gemini API - CDAC 2026 Assignment

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)

[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org/)

[![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)](https://www.mysql.com/)

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🌟 Overview

A comprehensive knowledge sharing platform that enables users to create, share, and discover articles with AI-powered assistance. The platform features a modern UI with gradient designs, smooth animations, and intelligent content generation capabilities powered by Google's Gemini AI.

---

## 🎯 Key Features

### 📖 Article Management
- ✅ **Public Article Reading** - Browse articles without authentication
- ✅ **Create Articles** - Rich article creation with title, description, category, and tags
- ✅ **Edit & Delete** - Full CRUD operations for article authors
- ✅ **Search & Filter** - Search by keywords and filter by categories
- ✅ **Article Cards** - Display title, summary, author, category, and date

### 🤖 AI-Powered Features
- ✨ **Content Generation** - Generate complete article content from prompts
- ✨ **Smart Summaries** - Auto-generate concise summaries for articles
- ✨ **Tag Suggestions** - AI-powered tag recommendations
- ✨ **Content Improvement** - Enhance grammar, clarity, and readability
- ✨ **Title Suggestions** - Get better title recommendations
- ✨ **One-Click Summary** - Generate summaries directly on article detail pages

### 👥 User Features
- 🔐 **Authentication** - Secure registration and login with JWT
- 👤 **User Profiles** - Manage personal information
- 💬 **Comments** - Add and delete comments on articles
- 🔒 **Protected Routes** - Login required for creating content

### 🎨 Modern UI/UX
- 🌈 **Gradient Design** - Beautiful purple-blue gradient theme
- ✨ **Smooth Animations** - Card hover effects and transitions
- 📱 **Responsive Design** - Mobile-friendly Bootstrap 5 layout
- 🔔 **Toast Notifications** - Real-time feedback with react-toastify
- 🎯 **Intuitive Navigation** - Clean and user-friendly interface

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.3 + Vite
- **Styling**: Bootstrap 5 + Custom CSS
- **Routing**: React Router DOM v6
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **State Management**: Context API

### Backend
- **Runtime**: Node.js + Express.js
- **Database**: MySQL 8.0
- **Authentication**: JWT + bcrypt
- **AI Integration**: Google Gemini API (@google/generative-ai)
- **Security**: CORS, parameterized queries

### Database Schema
- **users** - User accounts and profiles
- **categories** - Article categories
- **posts** - Articles with title, description, summary
- **tags** - Article tags
- **post_tags** - Many-to-many relationship
- **comments** - User comments on articles

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v8 or higher) - [Download](https://dev.mysql.com/downloads/)
- **Gemini API Key** - [Get API Key](https://makersuite.google.com/app/apikey)
- **Git** (optional) - [Download](https://git-scm.com/)

---

## 🚀 Installation & Setup

### Step 1: Clone or Download the Project

```bash
https://github.com/AmitPatil8221/Knowledge-Sharing-Platform-with-AI-Assist.git
cd Knowledge-Sharing-Platform-with-AI-Assist

# Or download and extract the ZIP file
```

### Step 2: Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Create database and tables
source database_schema.sql
```

**Or manually:**

```sql
CREATE DATABASE knowledge_platform;
USE knowledge_platform;
-- Then run the SQL from database_schema.sql
```

### Step 3: Backend Setup

```bash
# Navigate to backend directory
cd "Knowledge Sharing Platform Backend"

# Install dependencies
npm install

# Create environment file
copy .env.example .env  # Windows
# OR
cp .env.example .env    # Linux/Mac

# Edit .env file with your credentials
```

**Configure `.env` file:**

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=knowledge_platform
JWT_SECRET=your_secret_key_min_32_characters_long
GEMINI_API_KEY=your_gemini_api_key_here
```

**Start the backend server:**

```bash
# Production mode
npm start

# Development mode (with auto-reload)
npm run dev
```

✅ Backend will run on: `http://localhost:5000`

### Step 4: Frontend Setup

```bash
# Navigate to frontend directory
cd "Knowledge Sharing Platform Frontend"

# Install dependencies
npm install

# Create environment file (optional)
copy .env.example .env  # Windows
# OR
cp .env.example .env    # Linux/Mac
```

**Start the frontend server:**

```bash
npm run dev
```

✅ Frontend will run on: `http://localhost:5173`

---

## 📖 Usage Guide

### For Public Users (No Login Required)

1. **Browse Articles** - View all articles on the home page
2. **Search Articles** - Use the search bar to find specific content
3. **Filter by Category** - Select a category from the dropdown
4. **Read Articles** - Click on any article card to read full content
5. **Generate Summary** - Click "✨ Generate Summary" button on article detail page

### For Registered Users

1. **Register** - Create an account with username, email, and password
2. **Login** - Access your account
3. **Create Articles** - Click "Create Post" in navigation
   - Use AI to improve content
   - Generate title suggestions
   - Create summaries
   - Get tag recommendations
   - Generate full content from prompts
4. **Edit/Delete** - Manage your own articles
5. **Add Comments** - Engage with other articles
6. **Update Profile** - Manage your profile information

---

## 🔌 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/profile` | Get user profile | ✅ |
| PUT | `/api/auth/profile` | Update profile | ✅ |

### Article Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/posts` | Get all posts (with search & filter) | ❌ |
| GET | `/api/posts/:id` | Get single post | ❌ |
| POST | `/api/posts` | Create new post | ✅ |
| PUT | `/api/posts/:id` | Update post | ✅ |
| DELETE | `/api/posts/:id` | Delete post | ✅ |

### Comment Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/comments/:postId` | Get comments for post | ❌ |
| POST | `/api/comments/:postId` | Add comment | ✅ |
| DELETE | `/api/comments/:id` | Delete comment | ✅ |

### Category Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/categories` | Get all categories | ❌ |

### AI Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/ai/generate` | Generate AI content | ❌ |

**AI Generation Types:**
- `content` - Generate full article content
- `summary` - Generate article summary
- `tags` - Generate tag suggestions
- `improve` - Improve existing content
- `title` - Suggest better titles

**Request Body:**
```json
{
  "prompt": "Your content or prompt here",
  "type": "summary"
}
```

---

## 📁 Project Structure

```
Knowledge-Sharing-Platform-with-AI-Assist/
│
├── Knowledge Sharing Platform Backend/
│   ├── config/
│   │   └── database.js              # MySQL connection pool
│   ├── controllers/
│   │   ├── authController.js        # Authentication logic
│   │   ├── postController.js        # Post CRUD operations
│   │   ├── commentController.js     # Comment management
│   │   ├── categoryController.js    # Category operations
│   │   └── aiController.js          # Gemini AI integration
│   ├── models/
│   │   ├── User.js                  # User model
│   │   ├── Post.js                  # Post model
│   │   ├── Comment.js               # Comment model
│   │   └── Category.js              # Category model
│   ├── routes/
│   │   ├── authRoutes.js            # Auth routes
│   │   ├── postRoutes.js            # Post routes
│   │   ├── commentRoutes.js         # Comment routes
│   │   ├── categoryRoutes.js        # Category routes
│   │   └── aiRoutes.js              # AI routes
│   ├── middleware/
│   │   └── auth.js                  # JWT verification
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Environment template
│   ├── package.json                 # Dependencies
│   └── server.js                    # Entry point
│
├── Knowledge Sharing Platform Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── PostCard.jsx         # Article card component
│   │   │   ├── AIModal.jsx          # AI generation modal
│   │   │   └── ProtectedRoute.jsx   # Route protection
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Home page (public)
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Register.jsx         # Registration page
│   │   │   ├── CreatePost.jsx       # Create/Edit article
│   │   │   ├── PostDetail.jsx       # Article detail (public)
│   │   │   └── Profile.jsx          # User profile
│   │   ├── services/
│   │   │   └── api.js               # Axios configuration
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Authentication context
│   │   ├── hooks/
│   │   │   └── useAuth.js           # Auth hook
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── .env                         # Environment variables
│   ├── .env.example                 # Environment template
│   ├── package.json                 # Dependencies
│   └── vite.config.js               # Vite configuration
│
├── database_schema.sql              # Database schema
├── add_summary_field.sql            # Summary field migration
└── README.md                        # This file
```

---

## 🔒 Security Features

- ✅ **Password Hashing** - bcrypt with salt rounds
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Protected Routes** - Frontend and backend route protection
- ✅ **SQL Injection Prevention** - Parameterized queries
- ✅ **API Key Security** - Gemini API key secured in backend
- ✅ **CORS Configuration** - Controlled cross-origin requests
- ✅ **Session Management** - 2-hour token expiry with auto-logout

---

## 🎨 UI

<img width="1899" height="867" alt="Home" src="https://github.com/user-attachments/assets/d62b6062-370f-44f7-b167-71b218dfdac0" />

<img width="1898" height="864" alt="Login" src="https://github.com/user-attachments/assets/6b0e0e71-16f2-492a-8960-bd28ae7d7fe4" />

<img width="1897" height="870" alt="Register" src="https://github.com/user-attachments/assets/01e567c7-1e8b-4011-a8fd-a254e4643a07" />

<img width="1899" height="864" alt="Profile" src="https://github.com/user-attachments/assets/dd89b857-b0a4-4cee-8c94-4c025ee1a827" />

---

## 📊 Database Schema

### Users Table
- `id`, `username`, `email`, `password`, `full_name`, `bio`, `created_at`

### Categories Table
- `id`, `name`, `description`, `created_at`

### Posts Table
- `id`, `user_id`, `category_id`, `title`, `description`, `summary`, `tags`, `created_at`, `updated_at`

### Comments Table
- `id`, `post_id`, `user_id`, `content`, `created_at`

### Tags Table
- `id`, `name`, `created_at`

### Post_Tags Table
- `post_id`, `tag_id`

---

## 🚀 Future Enhancements

### Performance
- [ ] Implement Redis caching for sessions
- [ ] Add database indexing for faster queries
- [ ] Implement pagination for articles
- [ ] Add lazy loading for images

### Features
- [ ] Image upload for articles and profiles
- [ ] Real-time comments with WebSocket
- [ ] Article bookmarking/favorites
- [ ] User following system
- [ ] Email notifications
- [ ] Social media sharing

### Development
- [ ] Unit and integration tests
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Error logging and monitoring
- [ ] Rate limiting
- [ ] Input sanitization

---

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Error:**
```bash
# Check MySQL is running
mysql -u root -p

# Verify credentials in .env file
# Ensure database exists
```

**Port Already in Use:**
```bash
# Change PORT in .env file
PORT=5001
```

### Frontend Issues

**API Connection Error:**
```bash
# Verify backend is running on port 5000
# Check VITE_API_URL in .env
```

**Module Not Found:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 Requirements Checklist

- ✅ User registration and authentication
- ✅ Create, read, update, delete articles
- ✅ Public article viewing without login
- ✅ Article list with title, summary, author, category, date
- ✅ Search and filter functionality
- ✅ Category-based filtering
- ✅ Comment system
- ✅ AI-powered content generation
- ✅ AI summary generation (public access)
- ✅ Modern UI with gradient design
- ✅ Responsive Bootstrap 5 layout
- ✅ MySQL database with normalized schema
- ✅ RESTful API architecture
- ✅ JWT authentication
- ✅ Secure password hashing

---

## 👨‍💻 Developed By

**Amit Vitthal Patil**

---

## 📄 License

This project is licensed under the MIT License.

---

## 📞 Support

📧 **amitvpatil8221@gmail.com**
