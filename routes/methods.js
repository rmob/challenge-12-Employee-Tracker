const inquirer = require('inquirer')
const questionAddRole = require('./questionAddRole')
const questionAddDepartment = require('./questionAddDepartment')

const addRole = () => {
    inquirer.prompt(questionAddRole)
    .then(res => {
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
  
  const addDepartment = () => {
    inquirer.prompt(questionAddDepartment)
    .then(res => {
    // ADD DEPARTMENT
    db.query('INSERT INTO department (dept_name) VALUES ("' + `${res.newDept}`+ '")', function (err, results) {
      console.log('Department added successfully! \n')
    })
  
    // DISPLAY DEPARTMENT TABLE WITH NEW DEPARTMENT
    db.query('SELECT * FROM department', function(err, results) {
      console.table(results)
      initQuestion()
    })
  })
  }

  module.exports = { addRole, addDepartment }