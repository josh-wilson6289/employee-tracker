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

// New database entries
function newEntry(table) {
  let questions = [];
  let queryString = "";

  // Add new department
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

    // Add new Role
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
          queryString = `INSERT INTO role (title, salary, department_id) VALUES ('${answer.title}', '${answer.salary}', '${answer.departmentId}')`;
          
          connection.query(queryString, function(err, res) {
            if (err) throw err;
            console.log("Added new role");
            init();
          })
        });
      })
    break;

    // Add new employee
    case "Employee":
      questions.push("First name:", "Last name:", "Role:", "Manager:");
      // queryString = "SELECT role_id FROM employee LEFT JOIN role ON employee.role_id = role.id";
      queryString = "SELECT * FROM role";
      connection.query(queryString, function(err, roleRes) {
        if (err) throw err;
      queryString = "SELECT * FROM employee";
      connection.query(queryString, function(err, employeeRes) {
        if (err) throw err;
      
      inquirer.prompt([
        {
          type: "input",
          name: "firstName",
          message: questions[0]
        },
        {
          type: "input",
          name: "lastName",
          message: questions[1]
        },
        {
          type: "list",
          name: "roleId",
          choices: roleRes.map(role => {
            return {
              name: role.title,
              value: role.id
            }
          }),
          message: questions[2]
        },
        { type: "list",
          name: "managerId",
          choices: employeeRes.map(employee => {
            return {
              name: employee.first_name + " " + employee.last_name,
              value: employee.id
            }
          }),
          message: questions[3]
        }
      ])
      .then(answer => {
        queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.roleId}', '${answer.managerId}')`;
        connection.query(queryString, function(err, res) {
          if (err) throw err;
        })
          console.log("Added employee");
          init();
        })
      }) 
    })  
    break;
  }

  
}

function editTable(table) {
  console.log(`Editing ${table}`)
}

