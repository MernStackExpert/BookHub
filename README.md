# 📚 BookHub — Online Library & Book Store

**BookHub** is a modern, responsive full-stack web application built with **Next.js** (App Router) and **Express.js**.  
It lets users browse books, view rich book details, and manage their personal book collection through a polished dark-theme UI.

---

## 🔗 Live Links

- **Frontend (Client):** https://bookhub-plum.vercel.app  
- **Backend (Server Repo):** https://github.com/MernStackExpert/BookHub-Server.git

---

## ✨ Features

### Public
- Beautiful **Landing Page** with Hero, Featured Books, Testimonials & FAQ  
- **All Books** page with real-time search and category filters  
- **Book Details** page (dynamic route) with 3D cover/visual effects  
- Authentication using **Firebase** (Google + Email/Password)

### Protected (User Dashboard)
- **Add Book** — upload book data + cover image (ImgBB integration)  
- **Manage Books** — list, edit, delete books uploaded by the logged-in user  
- **Update Book** — edit details and replace cover image  
- **Private Routes** — middleware to protect dashboard routes
- **All Books** — Show All Books


### UI / UX
- Fully **responsive**: mobile, tablet, desktop  
- **Dark mode** aesthetic using Tailwind CSS + DaisyUI  
- Smooth animations, glassmorphism, and toast notifications (React Hot Toast / SweetAlert2)

---

## 🛠️ Tech Stack

**Frontend**
- Next.js (App Router)  
- Tailwind CSS + DaisyUI  
- React Icons  
- Firebase (Google, Email/Password)  
- Axios, React-Hook-Form, React-Hot-Toast / SweetAlert2

**Backend**
- Node.js, Express.js  
- MongoDB
- Deployed on Vercel (Serverless functions for API routes)

---

---

## 🚀 Getting Started

### 1️⃣ Clone the Repositories

```bash
git clone https://github.com/MernStackExpert/BookHub.git

git clone https://github.com/MernStackExpert/BookHub-Server.git

▶️ Backend Setup

cd BookHub-Server
npm install
npx nodemon Index.js

Create .env file in server:
MONGO_URI=your_mongo_uri


💻 Frontend Setup
cd BookHub
npm install
npm run dev

Create .env file in client:
NEXT_PUBLIC_apiKey= FIREBASE APIKEY
NEXT_PUBLIC_authDomain= FIREBASE AuthDomain
NEXT_PUBLIC_projectId= FIREBASE Project Id
NEXT_PUBLIC_storageBucket= FIREBASE Bucket
NEXT_PUBLIC_messagingSenderId= FIREBASE SenderId
NEXT_PUBLIC_appId= FIREBASE AppId
NEXT_PUBLIC_image_hosting_key = ImgBb Hosting Api Key