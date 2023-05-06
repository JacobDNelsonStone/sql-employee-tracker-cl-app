const mysql = require('mysql2');
const ctable = require('console.table');
const inquirer = require('inquirer');

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
        "View departments",
        "View roles",
        "View employees",
        "Add role",
        "Add employee",
        "Add department",
        "Update employee role",
        "Quit"
      ],
      name: "answer"
    })
    .then(function (data) {
      console.log(`Your selection: ${data.answer}`);

      switch (data.answer) {
        case "View departments":
          viewDepartments();
          break;
        case "View roles":
          viewRoles();
          break;
        case "View employees":
          viewEmployees();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        default:
          quit();
      }
    });
}

function viewDepartments(){
  db.query('SELECT * FROM department', function (err, res) {
    console.log(res);
    console.table(res);
    mainQuestions();
  });
};