const inquirer = require("inquirer");
const mysql = require("mysql");


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

// Initiallizes Program
function init() {
  return inquirer.prompt([
    {
      type: "list",
      name: "options",
      choices: ["Add", "View", "Update"],
      message: "Hello.  Please choose if you would like to add, view, or update the database."
    }
    ])
    .then(answers => {
      if (answers.options === 'Add') {
        add();
      }
      else if (answers.options === 'View') {
        view();
      }
      else {
        update();
      }
    })
}

function add(){
  console.log("add to database");
} 

function view(){
  console.log("view database");
}

function update(){
  console.log("update database");
}

