const mysql = require("mysql");
const connection = require("../db-config");
const {
  ALL_TASKS,
  SINGLE_TASKS,
  INSERT_TASK,
  UPDATE_TASK,
  DELETE_TASK,
} = require("../queries/tasks.queries");
const query = require("../utils/query");
const {
  serverError
} = require("../utils/handlers");

/**
 * CRUD - Create, Read, Update, Delete
 * GET - Read
 * POST - Create
 * PUT - Update
 * DELETE - Delete
 */

exports.getAllTasks = async (req, res) => {

  console.log("inside get all task..", req.params.userId);
  //establish connection
  const con = await connection().catch((err) => {
    throw err;
  });
  //query all tasks
  userId  = req.params.userId;
  const task = await query(con, ALL_TASKS(userId), []).catch(
    serverError(res)
  );
  // [] === true, 0 === false

  console.log(task, "task list..........................");
  if (task.length <= 0)  {
    res.status(400).json({
      msg: "No tasks available for this user."
    });
  }
  res.json(task);
};

// con.query(queries.ALL_TASKS, function(err, result, fields) {
//   if (err) {
//     res.send(err);
//   }
//   res.json(result);
// });

// http://localhost:3000/tasks/1
exports.getTask = async (req, res) => {
  console.log(req.body, "get task..");
  //establish connection
  const con = await connection().catch((err) => {
    throw err;
  });
  //query all tasks
  const task = await query(
    con,
    SINGLE_TASKS(req.user.id, req.params.taskId)
  ).catch(serverError(res));

  if (!task.length) {
    res.status(400).json({
      msg: "No tasks available for this user."
    });
  }
  res.json(task);
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
  console.log("Create Task..", req.body);
  //verify valid token
  // const user = req.body.user; // {id:1, iat:wlenfwekl, expiredIn:9174323}
  const user = {
    id: req.body.user_id
  }
  console.log(req.body)
  // take result of middleware check
  if (user.id) {
    //establish connection
    const con = await connection().catch((err) => {
      throw err;
    });
    //query add task
    const taskName = mysql.escape(req.body.task_name);
    //query create a task
    const result = await query(con, INSERT_TASK(user.id, taskName)).catch(
      serverError(res)
    );
    if (result.affectedRows !== 1) {
      res
        .status(500)
        .json({
          message: `Unable to add task: ${req.body.task_name}`
        });
    }
    res.json({
      msg: "Added task successfully!"
    });
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

/**
 *
 * Build up values string
 *
 * @example 'key1 =value1, key2 =value2,...
 */
const _buildValuesString = (req) => {
  const body = req.body;
  const values = Object.keys(body).map(
    (key) => `${key} = ${mysql.escape(body[key])}`
  );
  values.push(`created_date = Now()`); //update current date and time
  values.join(", "); // make into a string
  return values;
};
// http://localhost:3000/tasks/1
/**
 * PUT request -
 * {
 *  name: 'A task name',
 *  state: 'completed'
 * }
 */
exports.updateTask = async (req, res) => {
  console.log(req.body, "update task.");
  //establish connection
  const con = await connection().catch((err) => {
    throw err;
  });
  const values = _builValuesString(req);
  //query to update a task
  const result = await query(
    con,
    UPDATE_TASK(req.user.id, req.params.taskId, values)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({
        msg: `Unable to update task: '${req.body.task_name}'`
      });
  } else {res.json(result);}
  
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
  console.log(req.body,"delete task.....");
  //establish connection
  const con = await connection().catch((err) => {
    throw err;
  });
  //query to delete a task
  const result = await query(
    con,
    DELETE_TASK(req.params.userId, req.params.taskId)
  ).catch(serverError(res));

  if (result.affectedRows !== 1) {
    res
      .status(500)
      .json({
        msg: `Unable to delete task at: '${req.params.taskId}'`
      });
  }
  res.json({
    message: "Deleted successfully!"
  });
};

// (req, res) => {
//   con.query(DELETE_TASK, [req.params.taskId], function(err) {
//     if (err) {
//       res.send(err);
//     }
//     res.json({ message: 'Deleted successfully.' });
//   });
// };