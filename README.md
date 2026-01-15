# Employee Management System

## 📌 Project Overview

This project is a **Dynamic Employee Management System** developed as part of a **machine test assignment**.

The application allows administrators to:
- Design dynamic employee forms
- Reorder form fields using drag and drop
- Create employees using selected forms
- Search employees based on dynamic field labels
- Secure the system using JWT authentication

The backend is built using **Django REST Framework**, and the frontend is built using **React (Vite)**.

---

## 🛠️ Tech Stack

### Backend
- Python
- Django
- Django REST Framework
- JWT Authentication (SimpleJWT)
- SQLite

### Frontend
- React (Vite)
- Axios
- React Router
- @hello-pangea/dnd (Drag & Drop)

---

## 🔐 Authentication

- JWT-based authentication
- Access & Refresh tokens
- Automatic token refresh using Axios interceptors
- Protected routes for authenticated users

---

## ✨ Features

### Authentication
- Register
- Login
- Profile
- Change Password
- JWT Refresh Token Handling

### Dynamic Form Management
- Create dynamic forms
- Add and remove fields
- Edit forms
- Drag & drop field ordering

### Employee Management
- Create employees using selected forms
- Store employee data dynamically
- List employees
- Search employees by dynamic field labels
- Delete employees

### API Documentation
- Postman collection included

---

## 📁 Project Structure

```
employee-management/
├── backend/
│ ├── accounts/
│ ├── forms/
│ ├── employees/
│ └── manage.py
│
├── frontend/
│ └── src/
│ ├── api/
│ ├── pages/
│ ├── components/
│ └── App.jsx
│
├── postman/
│ └── Employee_Management_System.postman_collection.json
│
└── README.md
```

---

## ⚙️ Backend Setup

### 1️⃣ Create virtual environment
```
python -m venv venv
source venv/bin/activate
```

### 2️⃣ Create virtual environment

```
pip install -r requirements.txt
```

### 3️⃣ Run migrations

```python manage.py makemigrations
python manage.py migrate
```

4️⃣ Start backend server
````
python manage.py runserver
````
#### Backend runs at:

```
http://localhost:8000
```

## ⚙️ Frontend Setup
### 1️⃣ Install dependencies
```
cd frontend
npm install
```

### 2️⃣ Start frontend
```
npm run dev
```

#### Frontend runs at:

```
http://localhost:5173
```

## 🔄 API Base URL
```
http://localhost:8000/api/
```

## 🧪 Postman Collection

- Postman collection is available in the `/postman` directory

- Import the collection into Postman

- Login request automatically stores access and refresh tokens

## 🔁 Application Flow

1. User logs in

2. Redirected to Form Management Page

3. Create or edit dynamic forms

4. Create employee using selected form

5. View employee list

6. Search employees using dynamic fields
