# Task Management System

A full-stack Task Management application built with Django REST Framework and React, featuring JWT authentication and comprehensive task management capabilities.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)

## ✨ Features

### Authentication
- **User Registration & Login** - Secure user account creation and authentication
- **JWT-based Authentication** - Access and refresh token implementation
- **Protected Routes** - Task access restricted to authenticated users only
- **Secure Token Storage** - Tokens stored in HTTP-only cookies for enhanced security

### Task Management
- **CRUD Operations** - Create, read, update, and delete tasks
- **Task Properties**:
  - Title and description
  - Due date with datetime picker
  - Priority levels (Low, Medium, High)
  - Status tracking (Pending, In Progress, Completed)
- **Advanced Filtering** - Filter tasks by status, priority, and search terms
- **Personal Task Isolation** - Users can only access their own tasks

### Dashboard & Analytics
- **Task Analytics Dashboard** - Visual overview of task statistics
- **Real-time Metrics**:
  - Total tasks count
  - Completed tasks percentage
  - Pending tasks overview
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

## 🛠 Tech Stack

### Frontend
- **React** - Modern UI library with hooks
- **TypeScript** - Type-safe JavaScript development
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing
- **React Hook Form** - Form handling and validation

### Backend
- **Django** - High-level Python web framework
- **Django REST Framework** - Powerful toolkit for building APIs
- **djangorestframework-simplejwt** - JWT authentication
- **Django CORS Headers** - Cross-Origin Resource Sharing handling
- **PostgreSQL/SQLite** - Database options

## 📁 Project Structure

```
task-management-system/
├── frontend/                 # React application
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── features/        # Features
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Utility functions
│   │   └── App.tsx
│   ├── package.json
│   └── tailwind.config.js
├── backend/                  # Django application
│   ├── backend/        # Main Django project
│   ├── user/      # User auth app
│   ├── tasks/              # Task management app
│   ├── requirements.txt
│   └── manage.py
└── README.md
```

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **PostgreSQL** (optional, SQLite included)
- **Git**

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/task-management-system.git
cd task-management-system
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start development server
python manage.py runserver
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in new terminal)
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start development server
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Admin Panel**: http://localhost:8000/admin

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/user/register/` | User registration |
| POST | `/api/user/login/` | User login |

### Task Management Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks/` | Get all user tasks |
| POST | `/api/tasks/` | Create new task |
| GET | `/api/tasks/{id}/` | Get specific task |
| PUT | `/api/tasks/{id}/` | Update task |
| DELETE | `/api/tasks/{id}/` | Delete task |

### Query Parameters

- **Filter by status**: `/api/tasks/?status=completed`
- **Filter by priority**: `/api/tasks/?priority=high`
- **Search tasks**: `/api/tasks/?search=project`
- **Combine filters**: `/api/tasks/?status=pending&priority=high&search=important`

### Request/Response Examples

#### Create Task
```json
POST /api/tasks/
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "due_date": "2024-01-15T10:00:00Z",
  "priority": "high",
  "status": "pending"
}
```

#### Response
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "due_date": "2024-01-15T10:00:00Z",
  "priority": "high", 
  "status": "pending",
  "created_at": "2024-01-10T08:30:00Z",
  "updated_at": "2024-01-10T08:30:00Z"
}
```

## 🔐 Environment Variables

### Backend (.env)
```env
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
CORS_ALLOWED_ORIGINS=http://localhost:3000
JWT_ACCESS_TOKEN_LIFETIME=60
JWT_REFRESH_TOKEN_LIFETIME=1440
```

### Frontend (.env.local)
```env
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_ENVIRONMENT=development
```

## 💻 Usage

### 1. User Registration
- Navigate to `/register`
- Fill in username, email, and password
- Account created automatically logs you in

### 2. Task Management
- **Create Task**: Click the "Add Task" button, fill the form, and submit
- **View Tasks**: All tasks are displayed in the dashboard with filtering options
- **Update Task**: Click the edit icon, modify details, and save
- **Delete Task**: Click the delete icon and confirm the action

### 3. Dashboard Analytics
- View task statistics at the top of the dashboard
- Use filters to focus on specific task categories
- Search functionality for quick task location

