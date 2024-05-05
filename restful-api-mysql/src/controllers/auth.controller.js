//const jwt = require ('jsonwebtoken');
const bcrypt = require ('bcryptjs');

const connection = require ('../db-config');
const {
    GET_ME_BY_USERNAME,
    GET_ME_BY_USERNAME_WITH_PASSWORD,
    INSERT_NEW_USER,
} = require ('../queries/user.queries');
const query = require ('../utils/query');
const { refreshTokens, generateToken, generateRefreshToken} =require('../utils/jwt-helpers');
const escape = require(' ../utils/escape')

//register function
exports.register = async (req, res) => {
    console.log(req.body, "text")
    //param setup
    const passwordHash =bcrypt.hashSync (req.body.password);
    const { username, email, password } = escape ({
        ...req.body,
        password:passwordHash,
    });

    // establish a connection
    const con = await connection().catch((err) => {

        console.log(err, "sql errr..............")
        throw err;
    });

    // check for existing user frist
    const user =await query(con, GET_ME_BY_USERNAME, (username)).catch((err)=> {
        res.status(500);
        res.json({msg: 'Could not retrieve user.'});
    });
    
    // if we get one result back
    if (user.length === 1) {
        res.status(403).json({ msg: 'User already exists!'});
    } else {
        //add new user
        const result = await query(con, INSERT_NEW_USER(username, email, password)).catch((err) => {
            console.log(err);
            // stop registeration
            res
            .status(500)
            .send({ msg: 'Could not register user. Please try again later.'});
        });

        if (result.affectedRows === 1) {
            res.json({ msg: 'New user created!'});
        }
    }
};

//login function

exports.login =async (req, res) => {   
    
    const { username } = escape(req.body);
    const { password } =req.body;
    
    // establish a connection

    const con = await connection().catch((err) => {
        throw err;
    });
    
    //check for existing user first
    const user = await query(con, 
        GET_ME_BY_USERNAME_WITH_PASSWORD (username)
    ).catch((err) => {
        console.log(err);
        res.status(500);
        res.json({ msg: 'COuld not retrieve user.'});
    });

    //if the user exists
    if (user.length === 1) {
        // validate entered password from database saved password
        const validPass = await bcrypt
        .compare(password, user[0].password)
        .catch((err) => {
            console.log(err);
            res.status(500).json({ msg: 'Invalid password!'});
        });

        if(!validPass) {
            res.status(400).json({ msg: 'Invalid password'});
        } 
            // create token
            const accessToken = generateToken(user[0].user_id, { expiresIn: 86400 });
            const refreshToken = generateRefreshToken(user[0].user_id, { expiresIn: 86400 });
            const userId =  user[0].user_id;
            refreshTokens.push(refreshToken);

            res
            .header('access_token', accessToken) //ex.: {'auth-token: '  '}
            .json({
                auth:true,
                msg: 'Logged in!',
                token_type: 'bearer',
                access_token: accessToken,
                expires_in: 86400,
                refresh_token: refreshToken,
                user_id : userId,
            });
        } else {
            res
            .status(401)
            .json({ auth: false, msg: 'Access Denied. No token provided.'});
        }
    };

exports.token = (req, res) => {
        const refreshToken = req.body.token;

        // stop user auth validation if no token provided
        if (!refreshToken) {
            res
            .status(401)
            .json({
                auth:false,
                msg: 'Access Denied.No token provided'});
            }

            // stop refresh is refresh token invalid
            if (!refreshTokens.includes(refreshToken)) {
                res
                .status(403)
                .json({
                    msg: 'Invalid Refresh Token' });
                }
    
            const verified = verifyToken(refreshToken, jwtconfig.refresh, req, res);
    
            if(verified) {
                const accessToken = generateToken(user[0].user_id, { expiresIn: 86400 });
    
                res
                .header('access_token', accessToken) //ex.: {'auth-token: '  '}
                .json({
                    auth:true,
                    msg: 'Logged in!',
                    token_type: 'bearer',
                    access_token: accessToken,
                    expires_in: 20,
                    refresh_token: refreshToken,
    });
}
    res.status(403).json({ msg: 'Invalid Taken'});
};
exports.logout = (re,res) => {
       // const { token } = req.body;
       const refreshToken = req.body.token;
        refreshTokens = refreshTokens.filter((t) => t !== refreshToken);

        res.json({msg: 'Logout successful'});
};







//     con.query(
//         authQueries.INSERT_NEW_USER,
//         [req.body.username, req.body.email, passwordHash],
//         function(err, result) {
//             if (err) {
//                 //stop registration
//                 console.log(err);
//                 res
//                 .status(500)
//                 .send({msg: 'Could not register user. Please try again later.' });
//             }

//         con.query(
//             userQueries.GEET_ME_BY_USERNAME, [req.body.username], function(
//             err,
//             user
//         ) {
//             if (err) {
//                 res.status(500);
//                 res.send({msg: 'Could not retrive user.' });
//             }

//         console.log(user);
//         res.send(user);
//         });
//         }
//     );
// };

// exports.login = function(req, res) {
//     // check user exists
//     con.query(
//         userQueries.GET_ME_BY_USERNAME_WITH_PASSWORD,
//         [req.body.username],
//         function(err,user) {
//             if(err) {
//                 res.status(500);
//                 res.send({msg: 'Could not retrive user.' });
//             }
//             console.log(user);
//             // validate entered password from database saved password
//             bcrypt
//             .compare(req.body.password, user[0].password)
//             .then(function(validpass) {
//                 if (!validpass) {
//                     res.satus(400).send({ msg: 'Invalid password!' });
//                 }
                
//         // create token
//         const token = jwt.sign({ id: user[0].user_id }, jwtconfig.secret);
//         res
//         .header('auth-token', token)
//         .send({ auth: true, msg: 'Logged in!' });
//             })
//             .catch(console.log);
//              }
//            );
// };

// exports.updateUser = function(req, res) {
//     // check user exists
//     con.query(
//         userQueries.GET_ME_BY_USERNAME_WITH_PASSWORD,
//         [req.user.id],
//         function(err,user) {
//             console.log(err, user);
//             if(err) {
//                 res.status(500);
//                 res.send({msg: 'Could not retrive user.' });
//             }

//             console.log(user);
//             const passwordHash = bcrypt.hashSync(req.body.password);

//             //PERFORM UPDATE
//             con.query(
//                 authQueries.UPDATE_USER,
//                 [req.body.username, req.body.email, passwordHash, user[0].id],
//                 function(err, result) {
//                     if (err) {
//                         console.log(err);
//                         res.status(500).send({ msg: 'Could not update user settings.' });
//                     }
//                     res.json({ msg: 'Updated succesfully!' });
//                 }
//             );
//         }
//         ); 
//     
