//const jwt = require('jsonwebtoken');
//const jwtconfig = require('../jwt-config');
const { jwtconfig, verifyToken} = require('../utils/jwt-helpers');
 
module.exports = (req, res, next) => {
    const authHeader = req.headers['auth-token'] || req.headers['authorization'];
    
   // const token = req.headers['auth-token'];

    if (!authHeader) {
        //stop user auth validation
        res
        .status(401)
        .json({ auth:false, msg: 'Access Denied. No token provided'});
    }
    const accessToken = authHeader.split(' ')[1];
    try {
        //return the user's id when creating the token
        //const verified =jwt.verify(token, jwtconfig.secret);
        const user = verifyToken(accessToken, jwtconfig.access, req, res);
        req.user = user;
        next();
    } catch (err) {
        res.status(403).json({ msg: 'Invalid Token'});
    }
 };