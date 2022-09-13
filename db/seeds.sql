USE employee_db;

INSERT INTO department (department_name)
VALUES ('Sales'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES ("Salesperson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Account Manager", 160000, 3),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, roles_id, manager_id)
VALUES ("Mike", "Chan", 1, 1),
("Ashley", "Roderiquez", 2, 2),
("Kevin", "Tupik", 3, null),
("Kunal", "Singh", 4, 3),
("Kunal", "Hurst", 5, null),
("Malia", "Brown", 2, null),
("Tom", "Allen", 4, 7),
("Sarah", "Lourd", 1, 2);

