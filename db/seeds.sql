INSERT INTO department ( dept_name )
VALUES ('Finance'),
       ('Legal'),
       ('Sales'),
       ('Engineering');

INSERT INTO role (title, salary, department_id ) 
VALUES ('Account Manager', 160000.00, 1), -- role 1
       ('Accountant', 125000.00, 1), -- role 2
       ('Legal Team Lead', 250000.00, 2), -- role 3
       ('Lawyer', 190000.00, 2),
       ('Sales Lead', 100000.00, 3),
       ('Salesperson', 80000.00, 3),
       ('Lead Engineer', 150000.00, 4),
       ('Software Engineer', 120000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jon', 'Doe', 1, null),
       ('Mike', 'Chan', 2, 1),
       ('Ashley', 'Rodriguez', 3, null),
       ('Kevin', 'Tupik', 4, 3),
       ('Kunal', 'Singh', 5, null),
       ('Malia', 'Brown', 6, 5),
       ('Sarah', 'Lourd', 7, null),
       ('Tom', 'Allen', 8, 7);
