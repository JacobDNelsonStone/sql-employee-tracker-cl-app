const mysql = require('mysql2');
const ctable = require('console.table');
const inquirer = require('inquirer');
require('dotenv').config();

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: process.env.DB_USER,
    // MySQL password
    password: process.env.DB_PASSWORD,
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
      type: 'list',
      message: 'What would you like to do?',
      choices: [
        'View departments',
        'View roles',
        'View employees',
        'Add role',
        'Add employee',
        'Add department',
        'Update employee role',
        'Quit'
      ],
      name: "answer"
    })
    .then(function (data) {
      console.log(`Your selection: ${data.answer}`);

      switch (data.answer) {
        case 'View departments':
          viewDepartments();
          break;
        case 'View roles':
          viewRoles();
          break;
        case 'View employees':
          viewEmployees();
          break;
        case 'Add department':
          addDepartment();
          break;
        case 'Add role':
          addRole();
          break;
        case 'Add employee':
          addEmployee();
          break;
        case 'Update employee role':
          updateEmployee();
          break;
        case "Quit":
          quit();
          break;
      }
    });
}

function viewDepartments() {
  db.query('SELECT * FROM department', (err, res) => {
    if (err) {
      console.log(err);
      mainQuestions();
    }
    // console.log(res);
    console.table(res);
    mainQuestions();
  });
};

function viewRoles() {
  db.query('SELECT * FROM role', (err, res) => {
    if (err) {
      console.log(err);
      mainQuestions();
    }
    // console.log(res);
    console.table(res);
    mainQuestions();
  });
};

function viewEmployees() {
  db.query('SELECT * FROM employee', (err, res) => {
    if (err) {
      console.log(err);
      mainQuestions();
    }
    // console.log(res);
    console.table(res);
    mainQuestions();
  });
};

function addDepartment() {

  inquirer.prompt([{
    type: 'input',
    message: 'Please enter the name for the new department:',
    name: 'newDept'
  }]).then((answer) => {

    db.query(`INSERT INTO department (dept_name) VALUES ('${answer.newDept}')`, function (err, res) {
      if (err) {
        console.log(err);
        mainQuestions();
      };
      console.log(`Added ${answer.newDept} to the database.`);
      console.table(res);
      viewDepartments();
    });
  })
};
function addRole() {

  inquirer.prompt([
    {
      type: 'input',
      message: 'Please enter the title of the role you would like to add:',
      name: 'newRoleTitle'
    },
    {
      type: 'input',
      message: 'Please enter the salary of the new role:',
      name: 'newRoleSalary'
    },
    {
      type: 'input',
      message: 'Please enter the ID number of the department this role belongs to:',
      name: 'newRoleDeptId'
    }
  ]).then((answer) => {
    db.query(`INSERT INTO role ( title, salary, department_id ) VALUES ('${answer.newRoleTitle}', ${answer.newRoleSalary}, ${answer.newRoleDeptId})`, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(`Added ${answer.newRoleTitle} to the database.`);
      console.table(res);
      viewRoles();
    })
  });
};

function addEmployee() {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Please enter the first name of the new employee:',
      name: 'newEmpFirstName'
    },
    {
      type: 'input',
      message: 'Please enter the last name of the new employee:',
      name: 'newEmpLastName'
    },
    {
      type: 'input',
      message: 'Please enter the id number of the role of the new employee:',
      name: 'newEmpRoleId'
    },
    {
      type: 'input',
      message: 'Please enter the id number for the manager of the new employee (if applicable):',
      name: 'newEmpManId'
    }
  ]).then((answers) => {
    db.query(`INSERT INTO employee ( first_name, last_name, role_id, manager_id ) VALUES ('${answers.newEmpFirstName}', '${answers.newEmpLastName}', ${answers.newEmpRoleId}, ${answers.newEmpManId})`, (err, res) => {
      if (err) {
        console.log(err);
      }
      console.log(`Added ${answers.newEmpFirstName} ${answers.newEmpLastName} to the database.`);
      console.table(res);
      viewEmployees();
    });
  });
};

function updateEmployee() {
  db.query(`SELECT * FROM employee`, (err, res) => {
    if (err) {
      console.log(err);
    }
    // console.log(res);
    console.table(res);

    inquirer.prompt([
      {
        title: 'input',
        message: 'Please enter the id number of the employee you would like to update:',
        name: 'updateEmpId'
      },
      {
        title: 'input',
        message: 'Please enter the new role id of the employee you would like to update:',
        name: 'updateEmpRole'
      },
    ]).then((answers) => {
      db.query(`UPDATE employee SET role_id=${answers.updateEmpRole} WHERE id=${answers.updateEmpId}`, (err, res) => {
        if (err) {
          console.log(err);
        }
        console.log(`Updated employee ${answers.updateEmpId}'s role.`);
        // console.table(res);
        viewEmployees();
      });
    });
  });
};

function quit() {
  process.exit(0);
};
