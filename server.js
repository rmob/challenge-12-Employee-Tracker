const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer')
const figlet = require('figlet')
const question = require('./routes/questions')
const questionAddDepartment = require('./routes/questionAddDepartment')
const questionAddRole = require('./routes/questionAddRole')
const questionAddEmployee = require('./routes/questionAddEmployee')
const { addRole, addDepartment } = require('./routes/methods')
const cTable = require('console.table');
const questionUpdateEmployee = require('./routes/questionUpdateEmployee');
require('dotenv').config()



const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB,
  },
  console.log(`Connected to the company_db database.`)
);

// FUNCTION CALLED AT THE END TO INITIALIZE APP
const init = () => {
  makeTitle()

}

// CREATES ASCII BANNER
const makeTitle = () => {figlet.text('COMPANY_DB', {
  font: 'Ghost',
  horizontalLayout: 'universally smushed',
  verticalLayout: 'universally smushed',
  width: 80,
  whitespaceBreak: true,
}, async function(err, data) {
  if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
  }
  console.log(data);
  await initQuestion();
});
}

// FUNCTION CONTAINS ALL QUESTIONS AND RESPONSES
const initQuestion = () => {
  inquirer.prompt(question)
  .then(res => {
    if(res.action === 'view all roles') {
      db.query('Select * FROM emp_role', function(err, results) {
        console.table(results);
        initQuestion()
      })
    } else if (res.action === 'view all employees'){
      db.query('Select * from employee JOIN emp_role ON emp_role.id = employee.role_id', function(err, results) {
        console.table(results)
        initQuestion()
      })
    } else if (res.action === 'add a department'){
      inquirer.prompt(questionAddDepartment)
      .then(nextRes => {

        // ADD DEPARTMENT
        db.query('INSERT INTO department (dept_name) VALUES ("' + `${nextRes.newDept}`+ '")', function (err, results) {
          console.log('Department added successfully! \n')
        })

        // DISPLAY DEPARTMENT TABLE WITH NEW DEPARTMENT
        db.query('SELECT * FROM department', function(err, results) {
          console.table(results)
          initQuestion()
        })
        
        
      })
      
    } else if (res.action === 'add a role') {
      inquirer.prompt(questionAddRole)
      .then(res => {
        // ADD ROLE
        db.query('INSERT INTO emp_role (title, salary, department_id ) VALUES ("'+`${res.newRole}`+ '", "' + `${res.salary}` + '" , "' + `${res.dept}` + '")', function() {
          console.table('Role added successfully! \n')
        })

        // DISPLAY EMP_ROLE TABLE WITH NEW ADDITION
        db.query('SELECT * FROM emp_role', function(err, results) {
          console.table(results)
          initQuestion()
        })
       
      })
    }

    else if (res.action === 'add an employee') {
      inquirer.prompt(questionAddEmployee)
      .then(res => {

        // ADD EMPLOYEE
        db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id ) VALUES ("'+`${res.firstName}`+ '", "' + `${res.lastName}` + '" , "' + `${res.job}` + '", "' + `${res.manager}` + '")', function() {
          console.table('Employee added successfully! \n')
        })

        // DISPLAY EMPLOYEE TABLE WITH NEW ADDITION
        db.query('SELECT * FROM employee', function(err, results) {
          console.table(results)
          initQuestion()
        })
        
      })
      
    }

    else if (res.action === 'update an employee') {
      inquirer.prompt(questionUpdateEmployee)
      .then(res => {
        // UPDATE EMPLOYEE
        db.query('UPDATE employee SET role_id = ' + `${res.role}` + ', manager_id = ' + `${res.manager}` + ' WHERE employee.id = ' + `${res.id}`, function() {
          console.table('Employee updated successfully! \n')
        })
        // DISPLAY UPDATED EMPLOYEE TABLE
        db.query('SELECT * FROM employee', function(err, results) {
          console.table(results)
          initQuestion()
        })
      })
    }
  
})

}


app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


init()