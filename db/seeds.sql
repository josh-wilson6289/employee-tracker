USE employee_tracker;

INSERT INTO department (name)
VALUES ("Developement");

INSERT INTO role (title, salary, department_id)
VALUES ("Web Developer", "100000", 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Josh", "Wilson", 1, 1);