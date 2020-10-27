//Dependencies 
const inquirer = require('inquirer');
const mysql = require('mysql');

var connection = mysql.createConnection({
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
        }).then(function(response) {
            //If Else statements for matching the response from the user to the query functions that link to the database.
            if(response.command === "View all departments") {
                console.log('DEPARTMENTS');
                viewDepartments();
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
//             console.log(`ID: ${department.id}, Name: ${department.name}`)
//         })
//         init();
//     })
// };

