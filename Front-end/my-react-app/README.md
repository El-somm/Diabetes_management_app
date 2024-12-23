# Diabetes Management App

A full-stack application designed to help users manage their diabetes by tracking blood sugar levels, insulin usage, carbohydrate intake, and exercise. The app includes features for logging data, visualizing trends with graphs, nutrition search, and managing appointments via a calendar.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Clone the Repository](#clone-the-repository)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Endpoints](#endpoints)
- [License](#license)

---

## Features
- **Authentication:**
  - Login using Google OAuth 2.0.
  - Securely manages user sessions.
- **Dashboard:**
  - Visualize blood sugar, insulin, carbs, and exercise data on a responsive graph.
- **Log Management:**
  - Add, view, update, and delete logs.
- **Nutrition Search:**
  - Search nutritional information using the Nutritionix API.
- **Calendar:**
  - Track appointments and important dates.
- **Mobile and Desktop Responsive:**
  - Fully responsive for all devices.

---

## Tech Stack
### Frontend:
- React (with Vite)
- Axios
- Recharts (Graphing)

### Backend:
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- Passport.js (Google OAuth 2.0)

### APIs:
- Nutritionix API

---

## Getting Started

### Clone the Repository
1. **Clone the GitHub repository:**
   ```bash
   git clone https://github.com/el.som/diabetes-management-app.git
   cd diabetes-management-app