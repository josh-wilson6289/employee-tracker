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
  console.log("connected as id " + connection.threadI);
  init();
})


// Initiallizes program, asks user which table they'd like to view
function init() {
  return inquirer.prompt([
    {
      type: "list",
      name: "table",
      choices: ["Department", "Role", "Employee"],
      message: "Hello. Which table would you like to view?"
    }
    ])
    .then(answer => {
      viewTable(answer.table);
    });
}

// Shows users whichever table they chose
function viewTable(table) {
  let queryString = `SELECT * FROM ${table}`; 
  
  connection.query(queryString, function(err, result) {
    if (err) throw err;
    console.table(result);
    tableChange(table);
  });
}

// Asks user whether they'd like to create or update table
function tableChange(table) {
  return inquirer.prompt([
  {
    type: "list",
    name: "choices",
    choices: ["Add to table", "Edit table", "Exit"]
  }
  ])
    .then(answer => {
      switch(answer.choices) {
        case "Add to table":
          newEntry(table);
          break;
        case "Edit table": 
          editTable(table);
          break;
        case "Exit":
          init();
          break;
      }
    })
}

function newEntry(table) {
  let questions = [];
  let queryString = "";
  console.log(table);

  switch(table){
    case "Department":
      questions.push("Department:");
        
        return inquirer.prompt([
          {
            type: "input",
            name: "name",
            message: questions[0]
          }
        ])
          .then(answer => {
            queryString = `INSERT INTO department (name) VALUES ('${answer.name}')`
            connection.query(queryString, function(err, res) {
              if (err) throw err;
            })
            console.log("Added department");
            init();
          })
    break;
    case "Role":
      questions.push("Title:", "Salary:", "Department:");
      queryString = "SELECT * FROM department";

      connection.query(queryString, function(err, res) { 

        if (err) throw err;
        
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
            type: "list",
            name: "departmentId",
            choices: res.map(department=>{
              return {
                name: department.name,
                value: department.id
              }
            }),
            message: questions[2],
          }
        ])
        .then(answer => {
          queryString = `INSERT INTO role (title, salary, department_id) VALUES ('${answer.title}, '${answer.salary}', '${answer.departmentId}')`;
          console.log(queryString);
        });
      })
     
    break;
  }

  
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
