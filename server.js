//Dependencies 
const mysql = require('mysql');
const inquirer = require('inquirer');

//CONNECTION TO MYSQL SERVER
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
    console.log("Connected to server");
    init();
  });

//VIEW ALL DEPARTMENTS 
function viewAllDepartments() {
    let query = `SELECT departmentName, id FROM department`
    connection.query(query, function(err, result) {
        if (err) throw err;
        console.log("\n\n");
        console.table(result);
        console.log("\n\n");
        console.log("Press any arrow to return to CLI");
    });
    init();
    console.clear();
};  

//VIEW ROLES
function viewRoles() {
    let query = `SELECT title, salary, department_id FROM roles`
    connection.query(query, function (err, result) {
        if (err) throw err;
        console.log("\n\n");
        console.table(result);
        console.log("\n\n");
        console.log("Press any arrow to return to CLI");
    });
    init();
    console.clear();
}

//VIEW EMPLOYEES
function viewEmployees() {
    let query = `SELECT employee.id, first_name, last_name FROM employee`
    connection.query(query, function(err, result) {
        if (err) throw err;
        console.log("\n\n");
        console.table(result);
        console.log("\n\n");
        console.log("Press any arrow to return to CLI");
    });
    init();
    console.clear();
}

//ADD DEPARTMENTS
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
            if (err) throw err;    
            console.log("Department Successfully Added!");
            console.log("Press any arrow to return to CLI");
            })
            init();
            console.clear();
        })
}

//ADD ROLES 
function addRoles() {
    let query = `SELECT * FROM department`
    connection.query(query, function(err, result) {


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
            let savedDepartmentId; 
            for (let i = 0; i < result.length; i++) {
                if (result[i].departmentName === response.roleDepartment) {
                    savedDepartmentId = result[i].id;
                }
            }

            let query = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`
            connection.query(query, [response.roleTitle, response.roleSalary, savedDepartmentId], function(err, result) {
            if (err) throw err;
            console.log("New Role Successfully Added!");
            console.log("Press any arrow to return to CLI");
            })
            init();
            console.clear();
        })
    })
};

//MAIN CLI FUNCTION 
function init() {
    //Inquirer
    console.clear();
    inquirer
        .prompt({
            name: "command",
            type: "list",
            message: "Hello... What would you like to do?",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "Add new department",
                "Add new role",
                // "Update employee",
                "Exit"
            ]
        })
        .then(function(response) {
            //If Else statements for matching the response from the user to the query functions that link to the database.
            if (response.command === "View all departments") {
                viewAllDepartments();
            }
            else if (response.command === "View all employees") {
                viewEmployees();
            }
            else if (response.command === "View all roles") {
                viewRoles();
            }
            else if (response.command === "Add new department") {
                addDepartment();
            }
            else if (response.command === "Add new role") {
                addRoles();
            } 
            // else if (response.command === "Update employee") {
            //     updateRoleID()
            // }
            else if (response.command === "Exit") {
                connection.end();
                console.clear();
            }
     })
};


// NEW ARRAY HELPER
// function nameArrayHelper(array, key) {
//     let newArray = [];
//     for (let i = 0; i < array.length; i++) {
//         newArray.push(array[i][key]);
//     }

//     return newArray
// }

//UPDATE ROLE ID
// function updateRoleID () {
//     let query = `SELECT * FROM roles`
//     connection.query(query, function(err, roleResults) {
      
//         let query = `SELECT * FROM employee`

//         connection.query(query, function(err, empResults) {

//             let roleTitles = nameArrayHelper(roleResults, 'title');
//             let empNames = nameArrayHelper(empResults, 'first_name');
            

//             console.log('titles and names ????', roleTitles, empNames)

//             // inquirer and connection query (figure out id's)
//             //Instead of INSERT INTO 
//             //UPDATE employee SET role_id = ? WHERE id = ? 
//             inquirer
//         })
//     })
// }


