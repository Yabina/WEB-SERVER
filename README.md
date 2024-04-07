# Module 3 - Intro to Webservers and Databases

Serving our Website to a browser and extend our Websites Capabilities with API.


Give access right to root@localhost.
mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED VIA mysql_native_password USING PASSWORD('password');"
NOTE: once configured, move onto the next steps.

// Setup and Install
Install all packages:
npm install

//Spin up the mysql instance:
mysqld

//Run server instance:
npm start
MySQL Shell
Running the shell allows you to directly manage you databases and collections. This is for advanced use and shouldn't be used without looking at the documentation or googling further instructions.

mysql> CREATE DATABASE tododb;
Note: the ending semicolon is important to end all statements.



  // this is also true for tables
  con.query(queries.CREATE_TASKS_TABLE, function(err, result) {
    if (err) throw err;
    console.log('Table created or exists already!');
  });
});
