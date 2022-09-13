const express = require('express');
const inquirer = require('inquirer');
// Import and require mysql'
const consoleTable = require('console.table');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connecting to the database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        //DB Password goes here
        password: 'Avrilka357!',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db.`)
);

//Choose your next step
const startApp = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'Choose what you would like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Quit',
            ],

        },
    ]).then((answers) => {
        let selection = answers.selection;
        switch (selection) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'View All Roles':
                viewEmployeeRole();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Update Role':
                updateRole();
                break;
            case 'Quit':
                console.log(
                    'Thank you!'
                );
                connection.end();
                break;
        }
    });
}

//Add New Employee
function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the first name of the employee?",
                name: "first_name"
            },
            {
                type: "input",
                message: "What is the last name of the employee?",
                name: "last_name"
            },
            {
                type: "input",
                message: "What is the employee's role id number?",
                name: "roles_id"
            },
            {
                type: "input",
                message: "What is the manager's id number?",
                name: "manager_id"
            }
        ])
        .then(function (answer) {
            connection.query("INSERT INTO employee SET ? ",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    roles_id: answer.roles_id,
                    manager_id: answer.manager_id,
                },
                (err, answer) => {
                    if (err) throw err;
                    console.table(answer);
                    startApp()
                });
        }
        )
}
// View All Employees
function viewAllEmployees() {
    connection.query("SELECT * FROM employee;", (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}

//View All Departments
function viewAllDepartments() {
    connection.query("SELECT * FROM department;", (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}
//View All Roles
function viewEmployeeRole() {
    connection.query("SELECT * FROM roles;", (err, res) => {
        if (err) throw err;
        console.table(res);
        startApp();
    });
}
//Add New Role
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the role?",
                name: "title"
            },
            {
                type: "input",
                message: "What is the salary?",
                name: "salary"
            },
            {
                type: "input",
                message: "What is the department's id number?",
                name: "deptartment_id"
            }
        ])
        .then(function (answer) {

            connection.query("INSERT INTO roles SET ? ",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id,
                },
                (err, answer) => {
                    if (err) throw err;
                    console.table(answer);

                    startApp();
                });
        });
}
//Add New Department
function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What is the department_name?",
                name: "department_name"
            }
        ])
        .then(function (answer) {

            connection.query("INSERT INTO department SET ? ",
                {
                    department_name: answer.department_name,
                },
                (err, answer) => {
                    if (err) throw err;
                    console.table(answer);
                    startApp();
                });
        });
}


//Update Role
function updateRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Select employee you wanna update",
                name: "Select"
            },

            {
                type: "input",
                message: "Select a new role for your employee",
                name: "updateRole"
            }
        ])
        .then(function (answer) {
            connection.query('UPDATE employee SET roles_id=? WHERE first_name= ?', [answer.Select, answer.updateRole], function (err, res) {
                if (err) throw err;
                console.table(res);
                startApp();
            });
        });
}

startApp();
