// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const { allowedNodeEnvironmentFlags } = require("process");

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

// Code block to add to table
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

// Uses inquirer to ask correct questions for given table
function addToTable(selectedTable) {
  let questions = [];
  
  switch(selectedTable){
    case 'Departments':
      questions.push("New department name:");
      inquirer.prompt([
        {
          type: "input",
          name: "department",
          message: questions[0]
        }
      ])
        .then(answer => {
          addDepartment(answer);
        });
      break;
    case 'Roles':
      questions.push("Title:", "Salary:", "Department:");
      inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: questions[0]
        },
        {
          type: "input",
          name: "salary",
          message: questions[1]
        },
        {
          type: "input",
          name: "department",
          message: questions[2]
        }
      ])
        .then(answer => {
          addRole(answer);
        })
      break;
    case 'Employees':
      questions.push("First name:", "Last name:", "Role:", "Manager:")
      break;
  }
}

function addDepartment(answer) {
  let id = Math.floor(Math.random() * 1000);
  let queryString = `INSERT INTO department (id, name) VALUES ('${id}', '${answer.department}')`;
  
  connection.query(queryString, function (err, result) {
    if (err) throw err;
    console.log("Record inserted" + result);
  });
}

function addRole(answer) {
  let id = Math.floor(Math.random() * 1000);
  let queryString = `INSERT INTO role (id, title, salary, department_id) VALUES ('${id}', '${answer.title}', '${answer.salary}', '${answer.department}')`;

  connection.query(queryString, function(err, result) {
    if (err) throw err;
    console.log("Record inserted" + result);
  })
} 
function view(){
  console.log("view database");
}

function update(){
  console.log("update database");
}

