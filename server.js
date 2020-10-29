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

function viewAll() {
    let query = `SELECT employee.id, first_name, last_name, title, salary, departmentName, manager_id FROM employee JOIN roles on role_id = roles.id JOIN department ON department_id = department.id`
    connection.query(query, function(err, result) {
        if (err) throw err;
        console.log("\n\n");
        console.table(result);
    })
}  

function addDepartment() {
    inquirer
        .prompt({
            name: "newDepartment",
            type: "input",
            message: "Please enter new department name."
        })
        .then(function(response) {
            let query = `INSERT INTO department (departmentName) VALUES (?)`
            connection.query(query,[response.newDepartment],   function(err, result) {
            console.log(err, result);
            })
        })
}

function addRoles() {
    let query = `SELECT * FROM department`
    connection.query(query, function(err, result) {
    console.log(err, result);


        let newArray = [];

        for (let i = 0; i < result.length; i++) {
            newArray.push(result[i].departmentName);
        }
        inquirer
            .prompt ([
            {
                name: 'roleTitle',
                type: 'input',
                message: 'Please enter new role.'
            },
            {
                name: 'roleSalary',
                type: 'input',
                message: 'Please enter new role salary.'
            },
            {
                name: 'roleDepartment',
                type: 'list',
                choices: newArray,
                message: 'Please enter new role department.'
            }
        ])
        .then (function(response) {
            console.log('HEY LOOk', response);
            let savedDepartmentId; 
            for (let i = 0; i < result.length; i++) {
                if (result[i].departmentName === response.roleDepartment) {
                    savedDepartmentId = result[i].id;
                }
            }

            let query = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`
            connection.query(query, [response.roleTitle, response.roleSalary, savedDepartmentId], function(err, result) {
                if (err) throw err;
            })
        })
    })
}


function nameArrayHelper(array, key) {
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray.push(array[i][key]);
    }

    return newArray
}

function updateRoleID () {
    let query = `SELECT * FROM roles`
    connection.query(query, function(err, roleResults) {
      
        let query = `SELECT * FROM employee`

        connection.query(query, function(err, empResults) {

            let roleTitles = nameArrayHelper(roleResults, 'title');
            let empNames = nameArrayHelper(empResults, 'first_name');
            

            console.log('titles and names ????', roleTitles, empNames)

            // inquirer and connection query (figure out id's)
            //Instead of INSERT INTO 
            //UPDATE employee SET role_id = ? WHERE id = ? 
            inquirer
        })
    })
}

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
                "Add new department",
                "Add new role",
                "Update employee",
                "Exit"
            ]
        })
        .then(function(response) {
            //If Else statements for matching the response from the user to the query functions that link to the database.
            if (response.command === "View all departments") {
                viewAll();
            }
            else if (response.command === "Add new department") {
                addDepartment();
            }
            else if (response.command === "Add new role") {
                addRoles();
            } else if (response.command === "Update employee") {
                updateRoleID()
            }
            else if (response.command === "Exit") {
                connection.end();
            }
        })
};







//Query functions here
//NOT WORKING!
// function viewDepartments() {
//     let query = "SELECT * FROM department";
//     connection.query(query, function(err, res) {
//         console.log('DEPARTMENTS:')
//         res.forEach(function department() {
//             console.log(`ID: ${department.id} | Name: ${department.name}`)
//         })
//         init();
//     })
// };

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
