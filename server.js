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
                // viewDepartments();
            }
        })
};

//Query functions here
function viewDepartments() {

};

