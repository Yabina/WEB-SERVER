const controllers = require('../controllers/tasks.controller');
const express = require('express');

const tasksRoutes = express.Router();
/**
 * Express routes for Tasks.
 *
 * RESTful endpoints make for easily adding to existing API features.
 */

/**
 * Routes for all tasks. Evaluates to `/tasks/`.
 * 
 * 
 */

 
tasksRoutes.get('/getAllTask/:userId', controllers.getAllTasks);
tasksRoutes.get('/getTask/:taskId', controllers.getTask);
tasksRoutes.delete('/deleteTask/:userId/:taskId', controllers.deleteTask);
tasksRoutes.post('/createTask', controllers.createTask);
tasksRoutes.put('/updateTask/:taskId', controllers.updateTask);

// tasksRoutes.get('/', controllers.getAllTasks).post('/', controllers.createTask);

/**
 * Routes for a task by id. Evalutes to `/tasks/:taskId`.
 */
// tasksRoutes
//   .get('/:taskId', controllers.getTask) // GET http://locahost:3000/tasks/1
//   .put('/:taskId', controllers.updateTask)
//   .delete('/:taskId', controllers.deleteTask)
//   .post('/createTask', controllers.createTask);

module.exports = tasksRoutes;