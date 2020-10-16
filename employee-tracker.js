const inquirer = require("inquirer");
const mysql = require("mysql");
const { inherits } = require("util");

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
  console.log("Program initialized");
  
}

