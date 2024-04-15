//const jwt = require ('jsonwebtoken');

//const con = require ('../db-config');
//const jwtconfig = require ('../jwt-config');
//const queries = require ('../queries/user.queries');
const bcrypt = require ('bcryptjs');
const connection = require ('../db-config');
const {
    GET_ME_BY_USERNAME,
    GET_ME_BY_USERNAME_WITH_PASSWORD,
    INSERT_NEW_USER,
} = require ('../queries/user.queries');
const query = require ('../utils/query');

exports.getMe = async (req, res) => {

const decoded = req.user;

   // const token = req.headers['auth-token'];

  if (!!decoded) {
    // establish a connection
    const con = await connection().catch((err) => {
        throw err;
    });
    const user = await query (con, GET_ME_BY_USER_ID, [decoded.id]).catch(
        (err) => {
            res.status(500).send({ msg: 'Could not find the user.'});
        }
    );
    if(!user) {
        res.status(400).send({msg: 'No user found.'});
    }

    res.status(200).send(user);
   }
};
exports.updateMe = async (req, res) => {
    // establish a connection
    const con = await connection().catch((err) => {
        throw err;
    });
    // check for existing user first
    const user = await query(con, GET_ME_BY_USER_ID_WITH_PASSWORD, [
        req.user.id,
    ]).catch((err) => {
        res.status(500);
        res.send({ msg: 'Could not retrive user.'});
    });
    // checked for password changed
    // SAME LOGIC AS CHECKING FOR A VALID PASSWORD
    const passwordUnchanged = await bcrypt
    .compare(req.body.password, user[0].password)
    .catch((err) => {
        res.json(500).json({ msg: 'Invalid password!'});
    });

    if(!passwordUnchanged) { 
        const passwordHash = bcrypt.hashSync(req.body.password);

        // perform update
        const result = await query(con, UPDATE_USER, [
            req.body.username,
            req.body.email,
            passwordHash,
            user[0].id,
        ]).catch((err) => {
            res.status(500).send({ msg: 'Could not update user settings.' });
        });

        if(result.affectedRows === 1) {
            res.json({ msg: 'Updated successfuly!' });
        }
        res.json({ msg: 'Nothing to update ...'});
    }
};
//    jwt.verify(token, jwtconfig.secret, function(err, decoded) {
//     if (err) {
//         res
//         .status(500)
//         .send({ auth: false, message: 'Failed to authenticate token.' });
//     }

//     con.query(queries.GET_ME_BY_USER_ID, [decoded.id], function(err, user) {
//         if (err){
//             res
//             .status(500)
//             .send({ msg:  'Could no find the user.' });
//         }
//         if (!user){
//             res
//             .status(400)
//             .send({ msg:  'No user found.' });
//         }
//         res.status(200).send(user);
//     });
//    });
// };
