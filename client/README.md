# Kanban Board Project

## 📌 Overview
This project is a **Kanban Board** built using React, featuring drag-and-drop functionality with `react-beautiful-dnd`. It allows users to manage tasks across different columns (To-Do, In Progress, Done). The project integrates **Google OAuth for authentication** and communicates with a backend API to update task statuses.

## 🚀 Instructions to Run the Project

FrontEnd Set :-
### **1. Install Dependencies**
After cloning the repository, navigate to the project directory and run:
```sh
cd client
npm install
```

### **2. Start the Development Server**
To run the project in development mode:
```sh
npm run dev
```
This will start the app on `http://localhost:5175`.

### **3. Build for Production**
To create an optimized production build:
```sh
npm run build
```
Then, serve the build with:
```sh
npx serve -s build
```
Or, deploy it to a hosting service like **Vercel** or **Netlify**.

This will start a static server and serve your React app.

##############################################################

Backend setup:-
### **1. Install Dependencies**
After cloning the repository, navigate to the project directory and run:
```sh
cd server
npm install
```

### **2. Start the Development Server**
To run the project in development mode:
```sh
npm run dev
```
This will start the app on `http://localhost:8000`.

### **3. Build for Production**
To create an optimized production build:
```sh
node index.js
```


## 🔥 Features Implemented
- **User Authentication**: Google OAuth for secure login.
- **Drag and Drop**: Smooth task movement between columns using `react-beautiful-dnd`.
- **Persistent State**: Updates stored in the backend to persist changes.
- **Dynamic Task Rendering**: Tasks are fetched from the backend and categorized.
- **Responsive Design**: Works on different screen sizes.

## 🛠️ Challenges Faced & Solutions

### 1️⃣ **Issue: `DropResult` Import Error in `react-beautiful-dnd`**
**Problem:**
```sh
Module not found: 'DropResult' is not exported from 'react-beautiful-dnd'
```
**Solution:**
Instead of importing `DropResult` separately, use it inline:
```js
import { DragDropContext } from "react-beautiful-dnd";
const onDragEnd = (result) => { /* Handle drag */ };
```

### 2️⃣ **Issue: Tasks Not Updating After Drag & Drop**
**Problem:** The state wasn’t updating correctly when moving tasks.
**Solution:** Used `useState` correctly and ensured `setColumns` was called properly:
```js
setColumns((prevState) => ({
  ...prevState,
  [source.droppableId]: updatedSource,
  [destination.droppableId]: updatedDestination,
}));
```

### 3️⃣ **Issue: API Call on Drag and Drop to Update Task Status**
**Problem:** The backend was not receiving updated task statuses.
**Solution:** Called an API inside `onDragEnd` to update the task:
```js
await axios.put(`/api/tasks/${taskId}`, { status: newStatus });
```
This ensured real-time updates.

## 📜 Conclusion
This Kanban board efficiently manages tasks, integrates authentication, and allows real-time updates. Future improvements include adding **task deadlines**, **notifications**, and **collaborative features**.

---
👨‍💻 **Developed by:** [Palash Sharma]

