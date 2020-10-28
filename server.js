//Dependencies 
const mysql = require('mysql');
const inquirer = require('inquirer');

let connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "employee_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected");
    init();
  });

function init() {
    //Inquirer
    inquirer
        .prompt({
            name: "command",
            type: "rawlist",
            message: "Hello... What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Exit"
            ]
        })
        .then(function(response) {
            //If Else statements for matching the response from the user to the query functions that link to the database.
            if (response.command === "View all departments") {
                viewDepartments();
            }
            // else if (response.command === "View all roles") {
            //     viewRoles();
            // }
            // else if (response.command === "View all employees") {
            //     viewEmployees();
            // }
            else if (response.command === "Exit") {
                connection.end();
            }
        })
};

//Query functions here
//NOT WORKING!
function viewDepartments() {
    let query = "SELECT * FROM department";
    connection.query(query, function(err, res) {
        console.log('DEPARTMENTS:')
        res.forEach(function department() {
            console.log(`ID: ${department.id}, Name: ${department.name}`)
        })
        init();
    })
};

// function viewRoles() {
//     let query = "SELECT * FROM role";
//     connection.query(query, function(err, res) {
//         console.log('ROLES: ')
//         res.forEach(function role() {
//             console.log(`ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.department_id}`);
//         })
//         init();
//     });
// };

// function viewEmployees() {
//     let query = "SELECT * FROM employee";
//     connection.query(query, function(err, res) {
//         console.log('EMPLOYEES: ')
//         res.forEach(function employee() {
//             console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`);
//         })
//         init();
//     });
// };

//I still need at least one adding function. Start with add department. Use inquirer to prompt another input for new department name. Then use an INSERT INTO ? to add the new data into the department table.

// let query = "INSERT INTO department (name) VALUES (?)";
// function addDepartment() {
//     inquirer
//         .prompt({
//             type: 'input',
//         })
//         .then(function(response) {

//         })
// }
