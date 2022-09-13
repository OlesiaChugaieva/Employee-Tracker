DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(30) NOT NULL,
PRIMARY KEY(id)
);

CREATE TABLE roles (
id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);