/**
 * Tables follow syntax:
 * - CREATE TABLE <table_name>(<column_name> <data_type> <options>, ...)
 *
 * Create a table called `tasks` (case-insensitive), with
 * - id as an integer/number that can't have null values, auto-increment it
 * - name with a max of 255 characters, cannot have null values
 * - created_date set to date and time created
 * - status with a max of 10 characters, has a default of 'pending'
 *
 * NOTE: order is important.
 * - columns can have multiple options attached (take `id` column for example)
 * - id is always first (helps with inserting)
 * - defaults always specifed last (helps with inserting)
 */
exports.CREATE_TASKS_TABLE = `CREATE TABLE IF NOT EXISTS tasks (
    task_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    task_name VARCHAR(255) NOT NULL,
    description TEXT,
    priority INT DEFAULT 1,
    due_date DATE,
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP(),
    status ENUM('pending', 'in_progress', 'completed') DEFAULT 'pending',
    PRIMARY KEY (task_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
       ON UPDATE CASCADE
       ON DELETE CASCADE
)`;


// Get every task
exports.ALL_TASKS = (userId) => `SELECT * FROM tasks WHERE user_id = ${userId}`;

// Get a single task by id
exports.SINGLE_TASKS = (userId, taskId) => `SELECT * FROM tasks WHERE user_id = ${userId} AND task_id = ${taskId}`;

/**
 * Insert follows syntax:
 * - INSERT INTO <table_name>(<col_name1>, <col_name3>, <col_name3>, ...)
 *    VALUES(<value1>, <value2>, <value3>, ...)
 *
 * Create a new task in `tasks` table where
 * - column names match the order the are in the table
 * - `?` allow us to use params in our controllers
 */
exports.INSERT_TASK = (userId, taskName) => `INSERT INTO tasks (user_id, task_name) VALUES (${userId}, ${taskName})`;

/**
 * Update follows syntax:
 * - UPDATE <table_name> SET <colum_name> = '<new_value>' WHERE <colum_name> = '<old_value>'
 *
 * NOTE: omitting `WHERE` will result in updating every existing entry.
 */
exports.UPDATE_TASK = (userId, taskId, newValues) => `UPDATE tasks SET ${newValues} WHERE user_id = ${userId} AND task_Id = ${taskId}`;

// Delete a task by id
exports.DELETE_TASK = (userId, taskId) => `DELETE FROM tasks WHERE user_id = ${userId} AND task_id = ${taskId}`;