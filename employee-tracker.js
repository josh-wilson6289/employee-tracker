// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");

// Connect to mysql
var connection = mysql.createConnection({

  port: 3306,
  user: "root",
  password: "ABCabc123!!",
  database: "employee_tracker"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadID);
  init();
})

// Initiallizes program, asking user if they want to add, view, or update
function init() {
  return inquirer.prompt([
    {
      type: "list",
      name: "options",
      choices: ["Add", "View", "Update"],
      message: "Hello.  Please choose if you would like to add, view, or update the database."
    }
    ])
    .then(answer => {
      if (answer.options === 'Add') {
        add();
      }
      else if (answer.options === 'View') {
        view();
      }
      else {
        update();
      }
    })
}

// Code block to add 
function add(){
  return inquirer.prompt([
    {
      type: "list",
      name: "addToTable",
      choices: ["Departments", "Roles", "Employees"],
      message: "Which table would you like to add to?"
    }
    ])
    .then(answer => {
      addToTable(answer.addToTable);
    })
} 

function addToTable(selectedTable) {
  let questions = [];
  
  switch(selectedTable){
    case 'Departments':
      console.log("Selected table is departments");
      break;
    case 'Roles':
      console.log("Selected table is roles");
      break;
    case 'Employees':
      console.log("Selected table is employees");
      break;
  }
}



function view(){
  console.log("view database");
}

function update(){
  console.log("update database");
}

