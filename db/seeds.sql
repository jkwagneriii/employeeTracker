USE employee_db;

-- DEPARTMENT
INSERT INTO department (name) VALUES ("Production");
INSERT INTO department (name) VALUES ("Research and Development");
INSERT INTO department (name) VALUES ("Marketing");
INSERT INTO department (name) VALUES ("Film and Technology");

-- ROLE
INSERT INTO role (title, salary, department_id) VALUES ('Director', 100, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Script Supervisor', 75, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Billboard Graphics', 50, 3);
INSERT INTO role (title, salary, department_id) VALUES ('Cinematographer', 90, 4);
