const INQ = require("inquirer"); // Bring in inquire module
const FIG = require("figlet");

const { clear } = require("console"); // ? Does this work ??

// Grabs our DB and its models
const db = require("../models");


// GLOBAL VARIABLES
let managersArry = [{ name: "None", managerID: null },];
let roleArry = [{ name: "None", roleID: null, fkSalary: 0, fkDept: 0 }];
let deptArry = [{ name: "None", deptId: 0 }];

// PRELIMINARY LOADING FUNCTIONS AND DB CALLS
function reloadDB() {
    // --------------------------------------------------------------------------------------------------
    //  FINDS ALL MANAGERS WITH THEIR CORRESPONDING FK_ID AND PLACES IT IN AN ARRAY FOR LATER USE
    // --------------------------------------------------------------------------------------------------

    db.employee.findAll({ raw: true })
        .then(mObj => {
            mObj.forEach((o, i) => {
                let oPlaceholder = {
                    name: o.firstName + " " + o.lastName,
                    managerID: o.id,
                    fName: o.firstName,
                    lName: o.lastName,
                    fkRole: o.fk_role,
                    id: o.id
                }
                managersArry.push(oPlaceholder);
            })
        })
        .catch(err => {
            console.log("MANAGER REF ERROR::::" + err);
        });

    // --------------------------------------------------------------------------------------------------
    // FINDS ALL ROLES AND PLACES IT IN AN ARRAY FOR LATER USE
    // --------------------------------------------------------------------------------------------------

    db.role.findAll({ raw: true })
        .then(rObj => {
            rObj.forEach((o, i) => {
                let rPlaceholder = {
                    name: o.title,
                    roleID: o.id,
                    fkSalary: o.salary,
                    fkDept: o.dept
                }

                roleArry.push(rPlaceholder);
            })
        })
        .catch(err => {
            console.log("ROLE REF ERROR::::" + err);
        });

    // --------------------------------------------------------------------------------------------------
    // FINDS ALL DEPARTMENTS 
    // --------------------------------------------------------------------------------------------------

    db.department.findAll({ raw: true })
        .then(d => {
            d.forEach((o) => {
                let deptPlaceholder = { name: o.dept, deptId: o.id }
                deptArry.push(deptPlaceholder);
            })
        })

}
// ================================================================================
// SPLASH GRAPHIC
// ================================================================================

function splashGraphic() {
    
    const banner = "||************************************************************************||";
    FIG.text('EMPLOYEE TRACKER', {
        font: 'stick letters',
        // horizontalLayout: 'full',
        // verticalLayout: 'full',
        // width: 120,
        // whitespaceBreak: true
    }, function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(" ");
        console.log(banner);
        console.log(data);
        console.log(banner);
        console.log(" ");


    });
}

// ================================================================================
// MAIN MENU
// ================================================================================
function mainMenu() { // INITIAL MAIN MENU
    // ascii_art_generator.bar();
    clear();
    INQ
        .prompt([
            {
                type: 'list',
                name: 'main_menu_choice',
                message: 'Welcome to Employee Tracker. Please pick from the choices below',
                choices: ['Instructions', 'View Employees', 'Add New Employee', "Edit Employee", "Add New Job Role", "Add New Department", "Exit"]
            },
        ])
        .then((response) => {
            if (response.main_menu_choice === "Instructions") {
                console.log("Instructions!");
            } else if (response.main_menu_choice === "View Employees") {
                reloadDB();
                clear();
                setTimeout(viewEmployees, 700);
            } else if (response.main_menu_choice === "Add New Employee") {
                reloadDB();
                clear();
                setTimeout(addEmployee, 700);
            } else if (response.main_menu_choice === "Edit Employee") {
                console.log("Editing employee");
            } else if (response.main_menu_choice === "Add New Job Role") {
                reloadDB();
                clear();
                setTimeout(insertJobRole, 700);
            } else if (response.main_menu_choice === "Add New Department") {
                reloadDB();
                clear();
                setTimeout(insertDept, 700);

            } else {
                console.log("Exiting . . . ");
            }
        })
        .catch((err) => {
            console.log("Error -->> Main menu choice error: " + err);
        })
}

// ================================================================================
// VIEW EMPLOYEES TABLE
// ================================================================================
function viewEmployees() {
    INQ
        .prompt([
            {
                type: 'list',
                name: 'view_menu_choice',
                message: 'Please pick from the choices below',
                choices: [
                    'View all employees',
                    'View all Employees by department',
                    'View all Employees by manager',
                    'View all Employees by salary',
                    'Return to main menu',
                    'Exit']
            },
        ])
        .then((response) => {
            if (response.view_menu_choice === "View all employees") {
                console.log("View all employees!");
            } else if (response.view_menu_choice === "View all Employees by department") {
                console.log("View all Employees by department!");
            } else if (response.view_menu_choice === "View all Employees by manager") {
                console.log("View all Employees by manager");
            } else if (response.view_menu_choice === "View all Employees by salary") {
                console.log("View all Employees by salary! ");
            } else if (response.view_menu_choice === "Return to main menu") {
                console.log("Return to main menu! ");
                clear();
                reloadDB();
                clear();
                setTimeout(mainMenu, 700);
            } else {
                console.log("Exiting . . . ");
            }
        })
        .catch((err) => {
            console.log("Error -->> View employees menu choice error: " + err);
        })
}

// ================================================================================
// ADD EMPLOYEE 
// ================================================================================
function addEmployee() {

    // CREATE ARRAY FOR ROLE/TITLES AND DEPARTMENT
    console.log("Please enter employee information below when prompted.");
    INQ
        .prompt([
            {
                name: 'firstName',
                message: "First name:",
            },
            {
                name: 'lastName',
                message: "Last name:",
            },
            {
                type: 'list',
                message: "Job Title:",
                name: 'fk_role',
                choices: roleArry
            },
            {
                type: 'list',
                message: "Department:",
                name: 'dept',
                choices: deptArry
            },
            {
                type: 'list',
                message: "Manager:",
                name: 'fk_manager',
                choices: managersArry
            },
            {
                name: 'salary',
                message: "Salary:",
            },

        ])
        .then(employeeObj => {
            let manager_id = managersArry.find((o, i) => { return employeeObj.fk_manager === o.name })
            let role_id = roleArry.find((o, i) => { return employeeObj.fk_role === o.name })


            // CREATES NEW EMPLOYEE OBJECT TO BE INSERTED INTO EMPLOYEE TABLE
            newEmployee = {
                firstName: employeeObj.firstName,
                lastName: employeeObj.lastName,
                fk_role: role_id.roleID,
                dept: employeeObj.dept,
                fk_manager: manager_id.managerID,
                salary: employeeObj.salary
            };

            // INSERTS NEW EMPLOYEE INTO EMPLOYEE TABLE INTO DATABASE 
            db.employee.create(newEmployee).then(() => { console.log("NEW EMPLOYEE ADDED!") });
            clear();
            reloadDB();
            clear();
            setTimeout(mainMenu, 700);


        }).catch(err => {
            console.log("Error --> Employee object not created " + err);
        });
}

// ================================================================================
// UPDATE EMPLOYEE 
// ================================================================================
function UpdateEmployee() {

}

// ================================================================================
// DELETE EMPLOYEE 
// ================================================================================
function deleteEmployee() {

}

// ================================================================================
// ADD NEW EMPLOYEE JOB ROLE 
// ================================================================================
function insertJobRole() {
    INQ
        .prompt([
            {
                name: 'role',
                message: "Insert New Role:",
            },
            {
                name: 'salary',
                message: "Insert New salary:",
            },
            {
                type: 'list',
                message: "Choose Department assigned to Role:",
                name: 'dept',
                choices: deptArry
            },

        ])
        .then(obj => {

            let dId = deptArry.find(o => {
                if (obj.dept === o.name) { return o.deptId; }
            })

            let newRoleObject = {
                title: obj.role,
                salary: obj.salary,
                fk_department: dId.deptId
            }

            // INSERTS NEW EMPLOYEE ROLE INTO ROLE TABLE INTO DATABASE 
            db.role.create(newRoleObject).then(() => { console.log("NEW EMPLOYEE ROLE ADDED!") });
            clear();
            reloadDB();
            clear();
            setTimeout(mainMenu, 700);


        }).catch(err => {
            console.log("Error --> Employee Role object not created " + err);
        });
}


// ================================================================================
// ADD NEW DEPARTMENT
// ================================================================================
// deptArry
function insertDept() {
    INQ
        .prompt([
            {
                name: 'dept',
                message: "Insert New Department:",
            },


        ])
        .then(obj => {

            // INSERTS NEW DEPARTMENT  INTO DEPARTMENT TABLE INTO DATABASE 
            db.department.create(obj).then(() => { console.log("NEW DEPARTMENT ADDED!") });
            clear();
            reloadDB();
            clear();
            setTimeout(mainMenu, 700);



        }).catch(err => {
            console.log("Error --> Department object not created " + err);
        });


}



splashGraphic();
reloadDB();
setTimeout( mainMenu, 1500);


