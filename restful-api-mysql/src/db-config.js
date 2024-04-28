const mysql = require('mysql');
const { CREATE_USERS_TABLE} =require('./queries/user.queries')
const { CREATE_TASKS_TABLE} =require('./queries/tasks.queries')
const query = require('./utils/query');
//const queries = require('./queries/tasks.queries');

// Get the Host from Environment or use default
const host = process.env.DB_HOST || 'localhost';

// Get the User for DB from Environment or use default
const user = process.env.DB_USER || 'root';

// Get the Password for DB from Environment or use default
const password = process.env.DB_PASS || 'password'; // Change the password

// Get the Database from Environment or use default
const database = process.env.DB_DATABASE || 'tododb';

// Get the Port from Environment or use default
const port = process.env.DB_PORT || '3306';

// Create the connection with required details
module.exports = async (params) => {
  return new Promise (async (resolve, reject) => {
    
 const con = mysql.createConnection({
    host,
    user,
    password,
    port,
  database
});
 
const userTableCreated = await query(con, CREATE_USERS_TABLE).catch((err) => {
  reject(err);
});
const tasksTableCreated = await query(con, CREATE_TASKS_TABLE).catch((err) => {
  reject(err);
});
if(!!userTableCreated && !!tasksTableCreated) {
  resolve(con);
}
});
};



// Connect to the database.
//con.connect(function(err) {
 // if (err) throw err;
 // console.log('Connected!');

 // con.query(authQueries.CREATE_USERS_TABLE, function(err, result) {
 //   if (err) throw err;
 //   console.log('Users table created or exists already!');
  //});

  //con.query(queries.CREATE_TASKS_TABLE, function(err, result) {
   // if (err) throw err;
   // console.log('Table created or exists already!');
 // });
//});

//module.exports = con;