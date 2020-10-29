DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

INSERT INTO department (departmentName) VALUES ('HEY');

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    departmentName VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30)NOT NULL,
    salary DECIMAL (10,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY(department_id) REFERENCES department (id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL, 
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL, 
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY(role_id) REFERENCES roles(id)
);

SELECT * FROM roles;
SELECT * FROM department; 


