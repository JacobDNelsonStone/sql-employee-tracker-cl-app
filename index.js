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

function viewRoles(){
  db.query('SELECT * FROM roles', function (err, res) {
    if (err){
      console.log(err);
      mainQuestions();
    }
    console.log(res);
    console.table(res);
    mainQuestions();
  });
};

function viewEmployees(){
  db.query('SELECT * FROM employee', function (err, res){
    if (err){
      console.log(err);
      mainQuestions();
    }
    console.log(res);
    console.table(res);
    mainQuestions();
  });
};

function addDepartment() {

  inquirer.prompt({
    type: 'input',
    message: 'Please enter the name for the new department',
    name: 'newDept'
  }).then(function(answer) {
  
  db.query('INSERT INTO department (dept_name) VALUES (?)', [answer.newDept], function (err, res) {
    if (err){
      console.log(err);
      mainQuestions();
    };
    console.log(res);
    console.table(res);
    mainQuestions();
  });
 })
};
function addRole(){

  inquirer.prompt([
    {
      title: 'input',
      message: 'please enter the ID number for the new role',
      name: 'newRoleId'
    },
    {
      type: 'input',
      message: 'Please enter the title of the role you would like to add',
      name: 'newRoleTitle'
    },
    {
      type: 'input',
      message: 'Please enter the salary of the new role',
      name: 'newRoleSalary'
    },
    {
      type: 'input',
      message: 'Please enter the ID number of the department this role belong',
      name: 'newRoleDeptId'
    }
  ]).then(function (answer){
  db.query('INSERT INTO role (id, title, salary, department_id ) VALUES (?, ?, ?)', [answer.newRoleId], [answer.newRoleTitle], [answer.newRoleSalary], [answer.newRoleDeptId], function (err, res){
    if(err){
      console.log(err);

    }
    console.log(res);
    console.table(res);
    mainQuestions();
  })
});
};