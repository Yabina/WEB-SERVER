const express = require ('express');
//const controller = require ('../controller/auth.controller');
const {
    register,
    login,
    logout,
    token,
} = require('../controllers/auth.controller');

const authRoutes = express.Router();
 authRoutes.post('/register', register);
 authRoutes.post('/login', login);
 authRoutes.post('/token', token);
 authRoutes.post('/logout', logout);

 //authRoutes.post('/register', controller.registerUser);

//authRoutes.post('/login', controller.login);

module.exports =authRoutes;
