# ToDo-2.0

This project is a simple task management application built as part of my web development learning journey.It has a lot new features compared to my first ToDo application. It has a backend and supports all CRUD operations.

## Project Overview

- **Project Name:** ToDo-2.0
- **Technologies Used:** HTML, CSS, JavaScript (Frontend), Node.js, Express.js (Backend)
- **Objective:** To practice and demonstrate my understanding of frontend-backend integration using REST APIs.

## Features

- **Add Task:** Users can add a new task, which is stored in a JSON file on the server.
- **Update Task:** Users can update the description of an existing task by its unique ID.
- **Delete Task:** Users can delete a task by its unique ID.
- **Get all Tasks:** All tasks are fetched from the server and displayed on the frontend.

## Project Structure

```
task-management-app/
├── public/                  # Contains static frontend files
│   ├── index.html           # Main HTML file
│   ├── style.css            # Styling for the application
│   └── script.js            # JavaScript for frontend logic
├── server.js                # Backend server code using Node.js and Express.js
├── tasks.json               # File where tasks are stored on the server
└── README.md                # Project documentation
```

## Backend API Endpoints

- **GET /all**: Fetch all tasks from the `tasks.json` file.
- **POST /api/addTask**: Add a new task. The backend generates a unique ID for the task.
- **PUT /api/tasks/:id**: Update an existing task by ID.
- **DELETE /api/tasks/:id**: Delete a task by ID.

## What I Learned

- **Frontend-Backend Integration:** Gained experience in connecting a frontend with a backend using REST APIs.
- **JavaScript Fetch API:** Learned how to send HTTP requests from the frontend to the backend.
- **Node.js and Express:** Developed a basic understanding of building RESTful APIs with Node.js and Express.
- **Data Persistence:** Used a JSON file to persist data on the server.

## Future Improvements

- **Validation:** Implement input validation on both the frontend and backend.
- **Error Handling:** Improve error handling and user feedback for various operations.
- **Responsive Design:** Make the frontend more responsive for different screen sizes.
- **Authentication:** Add user authentication to associate tasks with individual users.
- **Integrate a DataBase:** Use a database instead of a tasks.json file

## How to Run the Project Locally

1. Clone the repository:

   ```bash
   git clone git@github.com:Shreehari-Acharya/Learning-Projects.git
   ```

2. Navigate to the project directory:
   
   ```bash
   cd ToDo-2.0
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the backend server:

   ```bash
   node server.js
   ```

5. Goto localhost:3000
