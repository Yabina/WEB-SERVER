//const jwt = require('jsonwebtoken');
//const jwtconfig = require('../jwt-config');
const { jwtconfig, verifyToken} =require('../utils/jwt-helpers');
 
module.exports = (req, res, next) => {
    const authHeader = req.headers['auth-token'] || req.headers['authorization'];
    const accessToken = authHeader.split(' ')[1];
   // const token = req.headers['auth-token'];

    if (!accessToken) {
        //stop user auth validation
        res
        .status(401)
        .send({ auth:false, msg: 'Access Denied. No token provided'});
    }
    try {
        //return the user's id when creating the token
        //const verified =jwt.verify(token, jwtconfig.secret);
        const user = verifyToken(accessToken, jwtconfig.access, req, res);
        req.user = user;
        next();
    } catch (err) {
        res.status(403).send({ msg: 'Invalid Token'});
    }
 };