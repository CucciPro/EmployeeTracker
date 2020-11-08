const inquirer = require('inquirer');
const logo = require('asciiart-logo');
const mysql = require("mysql2");

//Create db connection
const db = mysql.createConnection({
    multipleStatements: true,
    host: "localhost",
    port: 3306,
    user: "root",
    database: 'baseddata'
});

//connect to mysql
db.connect(err => {
    if(err) {
        throw err
    }
    displayLogo();
});

function displayLogo() {
    const logoText = logo({ name: 'EmployeeTracker' }).render();
  
    console.log(logoText);

    start();
  }

//start inquirer
function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View employees",
                "View departments",
                "View roles",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update employee role",
                "Exit"
            ]
        })
        .then((answer) => {
            if (answer.action === 'View employees') {
                employees(db);
            } else if (answer.action === 'View departments') {
                departments(db);
            } else if (answer.action === 'View roles') {
                roles(db);
            } else if (answer.action === 'Add a department') {
                addDepartment(db);
            } else if (answer.action === 'Add a role') {
                addRole(db);
            } else if (answer.action === 'Add an employee') {
                addEmployee(db);
            } else if (answer.action === 'Update employee role') {
                updateRole(db);
            } else if (answer.action === 'Exit') {
                db.end();
                console.log('Goodbye!');
            }
        })
}

function employees(db) {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id',
    function(err, res) {
        if(err) throw err;
        console.log("\n Employees Retrieved from DB \n");
        console.table(res);
        start();
    });
};

function departments(db) {
    db.query('SELECT * FROM department', function(err, res) {
        if(err) throw err;
        console.log("\n Departments Retrieved from DB \n");
        console.table(res);
        start();
    });
};

function roles(db) {
    db.query('SELECT * FROM role', function(err, res) {
        if(err) throw err;
        console.log("\n Roles Retrieved from DB \n");
        console.table(res);
        start();
    });
};

function addEmployee(db) {
    inquirer
    .prompt([{
        type: "input",
        name: "firstName",
        message: "Enter employees first name"
    },
    {
        type: "input",
        name: "lastName",
        message: "Enter employees last name"
    },
     {
         type: 'input',
         name: "employeeRoleID",
         message: "Enter the employees role id",
     },
     {
        type: 'input',
        name: "employeeManagerID",
        message: "Enter the employees manager id",
    }])
    .then(function(answer) {
        db.query('INSERT INTO employee SET ?',
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.employeeRoleID,
            manager_id: answer.employeeManagerID 
        },
        function(err, res) {
            if(err) throw err;
            console.log("\n Employee Added to DB \n");
            console.table(res);
            start();
        });
    })
}

function addDepartment(db) {
    inquirer
    .prompt({
        type: "input",
        name: "department",
        message: "What department would you like to add?"
    })
    .then(function(answer) {
        db.query('INSERT INTO department SET ?',
        {
            name: answer.department
        },
        function(err, res) {
            if(err) throw err;
            console.log("\n Added Department to DB \n");
            console.table(res);
            start();
        });
    })
}

function addRole(db) {
    inquirer
    .prompt([{
        type: "input",
        name: "roleTitle",
        message: "Enter role title"
    },
    {
        type: "input",
        name: "roleSalary",
        message: "Enter role salary"
    },
     {
         type: 'input',
         name: "deptID",
         message: "Enter the role's department ID"
     }])
    .then(function(answer) {
        db.query('INSERT INTO role SET ?',
        {
            title: answer.roleTitle,
            salary: answer.roleSalary,
            department_id: answer.deptID
        },
        function(err, res) {
            if(err) throw err;
            console.log("\n Added Role to DB \n");
            console.table(res);
            start();
        });
    })
}

function updateRole(db) {
    inquirer
    .prompt([{
        type: "input",
        name: "employeeID",
        message: "Enter the ID of the employee you are updating"
    },
    {
        type: "input",
        name: "roleID",
        message: "Enter the ID of the role you are wanting to assign"
    }])
    .then(function(answer) {
        db.query('UPDATE employee SET ? WHERE ?', 
        [
         {
            role_id: answer.roleID
         },
         {
            id: answer.employeeID
         }
        ],
        function(err, res) {
            if(err) throw err;
            console.log("\n Employee Role Updated in DB \n");
            console.table(res);
            start();
        });
    })
};