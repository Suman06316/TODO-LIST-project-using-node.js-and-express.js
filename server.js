const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');

const app = express();

// IMPORTANT: Middleware order matters!
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'user',
  database: 'todo_db'
});

db.connect((err) => {
  if (err) {
    console.error(' Database connection failed:', err);
    return;
  }
  console.log(' Connected to MySQL database');
  
});

// Get all todos
app.get('/todos', (req, res) => {
  const sql = 'SELECT * FROM todos ORDER BY created_at DESC';
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error(' Error fetching todos:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Add a new todo
app.post('/todos', (req, res) => {
  console.log('Request body:', req.body);
  
  const task = req.body.task;
  
  if (!task || task.trim() === '') {
    return res.status(400).json({ error: 'Task is required' });
  }
  
  const sql = 'INSERT INTO todos (task) VALUES (?)';
  
  db.query(sql, [task.trim()], (err, result) => {
    if (err) {
      console.error(' Error adding todo:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    res.status(201).json({
      id: result.insertId,
      task: task.trim(),
      completed: false,
      message: 'Todo added successfully'
    });
  });
});

// Update todo
app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const completed = req.body.completed;
  
  const sql = 'UPDATE todos SET completed = ? WHERE id = ?';
  
  db.query(sql, [completed, id], (err, result) => {
    if (err) {
      console.error(' Error updating todo:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json({ message: 'Todo updated successfully' });
  });
});

// Edit todo task
app.put('/todos/edit/:id', (req, res) => {
  const id = req.params.id;
  const task = req.body.task;
  
  if (!task || task.trim() === '') {
    return res.status(400).json({ error: 'Task is required' });
  }
  
  const sql = 'UPDATE todos SET task = ? WHERE id = ?';
  
  db.query(sql, [task.trim(), id], (err, result) => {
    if (err) {
      console.error(' Error editing todo:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json({ message: 'Todo edited successfully' });
  });
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  
  const sql = 'DELETE FROM todos WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(' Error deleting todo:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json({ message: 'Todo deleted successfully' });
  });
});

// Serve static files AFTER API routes
app.use(express.static(__dirname));

// Serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});