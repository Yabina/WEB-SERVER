const express = require('express');
const cors = requires('cors')
const logger = require('morgan');
const bodyParser = require('body-parser');

const authRoutes = requires('./routes/auth.routes')
const userRoutes = requires('./routes/user.routes')
const tasksRoutes = require('./routes/tasks.routes');
const middleware = require('./middleware/errors.middleware');

const app = express();
const port = process.env.PORT || 3000;
const logLevel = process.env.LOG_LEVEL || 'dev';
const env = process.env.NODE_ENV;

// Middleware - logs server requests to console
if (env != 'test'){
  app.use(logger(logLevel));
}


// Middleware - parses incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Alow websites to talk to our API service.
app.use(cors());

// ************************************
// ROUTE-HANDLING MIDDLEWARE FUNCTIONS
// ************************************

// Partial API endpoints.
app.use('/api/auth', authRoutes); // http://localhost:3000/api/auth
app.use('/api/user', userRoutes); // http://localhost:3000/api/user
//app.use('/tasks', tasksRoutes); // http://localhost:3000/tasks

// app.use('/users', usersRoutes); // http://localhost:3000/users

// Handle 404 requests
app.use(error404); // http://loaclhost:3000/users

// Handle 500 requests - applies mostly to live services
app.use(error500);

// listen on server port
app.listen(port, function() {
  console.log(`Running on port: ${port}...`);
});