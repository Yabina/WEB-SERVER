const connection = require('../db-config');
const {ALL_TASKS, SINGLE_TASKS, INSERT_TASK, UPDATE_TASK, DELETE_TASK} = require('../queries/tasks.queries');
const query = require('../utils/query');

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

exports.getAllTasks = async (req, res) => {
  //establish connection
  const con = await connection().catch((err) => {
    throw err;
});
  //query all tasks
  const tasks = await query(con, ALL_TASKS).catch((err) => {
    res.send(err);
       });
       if(tasks.length) {
        res.json(task);
       }
  };
  // con.query(queries.ALL_TASKS, function(err, result, fields) {
  //   if (err) {
  //     res.send(err);
  //   }
  //   res.json(result);
  // });


// http://localhost:3000/tasks/1
exports.getTask = async (req, res) => {
  //establish connection
  const con = await connection().catch((err) => {
    throw err;
});
  //query all tasks
  const tasks = await query(con, SINGLE_TASKS).catch((err) => {
    res.send(err);
       });
       if(tasks.length) {
        res.json(task);
       }
};

// (req, res) => {
//   con.query(SINGLE_TASKS, [req.params.taskId], function(err, result) {
//     if (err) {
//       res.send(err);
//     }
//     res.json(result);
//   });

// http://localhost:3000/tasks/1
/**
 * POST request -
 * {
 *  name: 'A task name'
 * }
 */
exports.createTask = async (req, res) => {
  //establish connection
  const con = await connection().catch((err) => {
    throw err;
});
  //query create a task
  const result = await query(con, INSERT_TASK, [req.body.name]).catch((err) => {
    res.send(err);
  });
    if (result.affectedRows === 1){
      res.json({ message: 'Added task successfully!' });
      
    }
};

// (req, res) => {
//   con.query(INSERT_TASK, [req.body.name], function(err, result) {
//     if (err) {
//       res.send(err);
//     }
//     console.log(result);
//     res.json({ message: 'Number of records inserted: ' + result.affectedRows });
//   });
// };

// http://localhost:3000/tasks/1
/**
 * PUT request -
 * {
 *  name: 'A task name',
 *  state: 'completed'
 * }
 */
exports.updateTask = async (req, res) => {
  //establish connection
  const con = await connection().catch((err) => {
    throw err;
});
  //query to update a task
  const result = await query(con, UPDATE_TASK, [req.body.name, req.body.status, req.params.taskId]).catch((err) => {
    res.send(err);
  });
    if (result.affectedRows === 1){
      res.json(result);
      
    }
};

// (req, res) => {
//   con.query(
//     UPDATE_TASK,
//     [req.body.name, req.body.status, req.params.taskId],
//     function(err, data) {
//       if (err) {
//         res.send(err);
//       }
//       res.json(data);
//     }
//   );
// };

// http://localhost:3000/tasks/1

exports.deleteTask = async (req, res) => {
  //establish connection
  const con = await connection().catch((err) => {
    throw err;
});
  //query to delete a task
  const result = await query(con, DELETE_TASK, [req.params.taskId]).catch((err) => {
    res.send(err);
  });
  if (result.affectedRows === 1){
    res.json({ message: 'Deleted successfully!' });
}
};

// (req, res) => {
//   con.query(DELETE_TASK, [req.params.taskId], function(err) {
//     if (err) {
//       res.send(err);
//     }
//     res.json({ message: 'Deleted successfully.' });
//   });
// };