A simple full-stack Todo List application built using Node.js, Express.js, and MySQL. This project demonstrates CRUD operations, RESTful APIs, and database connectivity, making it ideal for beginners learning backend and full-stack development. Add new todo items View all todo items Store todos in a MySQL database REST API built with Express.js Simple frontend to interact with the backend Clean project structure 
Tech Stack Frontend HTML CSS JavaScript (Vanilla) Backend Node.js Express.js Database MySQL Project Structure TODO-LIST-project-using-node.js-and-express.js/ index.html
# Frontend UIserver.js # Backend server ├── README.md # 
Project documentation Prerequisites Make sure you have the following installed: Node.js (v14 or higher) MySQL npm (comes with Node.js)  Database Setup Open MySQL and create a database: CREATE DATABASE todo_app; Use the database: USE todo_app;


Create a table: CREATE TABLE todos ( id INT AUTO_INCREMENT PRIMARY KEY, task VARCHAR(255) NOT NULL ); 

Backend Setup Clone the repository: git clone https://github.com/Suman06316/TODO-LIST-project-using-node.js-and-express.js.git Go into the project directory: cd TODO-LIST-project-using-node.js-and-express.js Install dependencies: 
npm install Update MySQL credentials in server.js:
const db = mysql.createConnection({ host: "localhost", user: "your_mysql_username", password: "your_mysql_password", database: "todo_app" });
How to Run the Project Start the backend server: node server.js or (if using nodemon): nodemon server.js Server will run on: http://localhost:3000 Open index.html in your browser (or use Live Server in VS Code) API Endpoints
Add a Todo POST /addTodo Request Body: { "task": "Learn Node.js" } Get All Todos GET /todos  
Example Use Case Open the app in your browser Enter a task in the input field Click Add Task is saved in MySQL and displayed on the page Learning Outcomes Understanding REST APIs Node.js & Express.js basics MySQL database integration Full-stack workflow CRUD operations  
