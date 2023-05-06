const mysql = require('mysql2');
const ctable = require('console.table');
const inquirer = reqiure('inquirer');

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'iwritegoodcode',
    database: 'employeedata_db'
  },
  console.log(`Connected to the employeedata_db database.`)
);

db.connect(function (err) {
  if (err) throw err;
  mainQuestions();
});

function mainQuestions() {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee role",
        "Quit"
      ],
      name: "answer"
    })
    .then(function (data) {
      console.log("You entered: " + data.answer);

      switch (data.answer) {
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "View departments":
          viewDepartment();
          break;
        case "View roles":
          viewRoles();
          break;
        case "View employees":
          viewEmployees();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        default:
          quit();
      }
    });
}
