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

// Initiallizes program, asks user which table they'd like to view
function init() {
  return inquirer.prompt([
    {
      type: "list",
      name: "options",
      choices: ["Department", "Role", "Employee"],
      message: "Hello. Which table would you like to view?"
    }
    ])
    .then(answer => {
      viewTable(answer.options);
    });
}

function viewTable(table) {
  let queryString = `SELECT * FROM ${table}`; 
  
  connection.query(queryString, function(err, result) {
    if (err) throw err;
    console.table(result);
    tableChange(table);
  });
}

function tableChange(table) {
  return inquirer.prompt([
  {
    type: "list",
    name: "changeTable",
    choices: ["Add to table", "Edit table", "Exit"]
  }
  ])
    .then(answer => {
      switch(answer.changeTable) {
        case "Add to table":
          newEntry(table);
          break;
        case "Edit table": 
          editTable(table);
          break;
        case "Exit":
          console.log("Exiting");
          break;
      }
    })
}

function newEntry(table) {
  console.log(`Adding to ${table}`);
}

function editTable(table) {
  console.log(`Editing ${table}`)
}

// // Code block to add to table
// function add(){
//   return inquirer.prompt([
//     {
//       type: "list",
//       name: "addToTable",
//       choices: ["Departments", "Roles", "Employees"],
//       message: "Which table would you like to add to?"
//     }
//     ])
//     .then(answer => {
//       addToTable(answer.addToTable);
//     })
// } 

// // Uses inquirer to ask correct questions for given table
// function addToTable(selectedTable) {
//   let questions = [];
  
//   switch(selectedTable){
//     case 'Departments':
//       questions.push("New department name:");
//       inquirer.prompt([
//         {
//           type: "input",
//           name: "department",
//           message: questions[0]
//         }
//       ])
//         .then(answer => {
//           addDepartment(answer);
//         });
//       break;
//     case 'Roles':
//       questions.push("Title:", "Salary:", "Department:");
//       inquirer.prompt([
//         {
//           type: "input",
//           name: "title",
//           message: questions[0]
//         },
//         {
//           type: "input",
//           name: "salary",
//           message: questions[1]
//         },
//         {
//           type: "input",
//           name: "department",
//           message: questions[2]
//         }
//       ])
//         .then(answer => {
//           addRole(answer);
//         })
//       break;
//     case 'Employees':
//       questions.push("First name:", "Last name:", "Role:", "Manager:")
//       break;
//   }
// }

// function addDepartment(answer) {
//   let id = Math.floor(Math.random() * 1000);
//   let queryString = `INSERT INTO department (id, name) VALUES ('${id}', '${answer.department}')`;
  
//   connection.query(queryString, function (err, result) {
//     if (err) throw err;
//     console.log("Record inserted" + result);
//   });
// }
