const express = require('express');
const taskController = require('../controllers/tasks.controller');
const tasksRoutes = express.Router();

tasksRoutes.get('/', taskController.getAllTasks);
tasksRoutes.post('/', taskController.createTask);
tasksRoutes.patch('/:id', taskController.updateTask);
tasksRoutes.delete('/:id', taskController.deleteTask);
module.exports = tasksRoutes;
