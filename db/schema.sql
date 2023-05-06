DROP DATABASE IF EXISTS employeedata_db;
CREATE DATABASE employeedata_db;

USE employeedata_db;

CREATE TABLE department (
  id INT PRIMARY KEY,
  dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL ( 10, 2 ) NOT NULL,
  department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee (
  id INT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
  manager_id INT
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
);


