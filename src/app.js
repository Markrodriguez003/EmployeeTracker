const INQ = require("inquirer"); // Bring in inquirer module for user prompts
const FIG = require("figlet");   // Bring in Figlet for ASCII graphics
const empTable = require('console.table');

const { clear } = require("console"); // ? Does this work ??

// Grabs our DB and its models
const db = require("../models");


// GLOBAL VARIABLES
let managersArry = [{ name: "None", managerID: null },];
let employeeArry = [];
let roleArry = [{ name: "None", roleID: null, fkSalary: 0, fkDept: 0 }];
let deptArry = [{ name: "None", deptId: 0 }];

// PRELIMINARY LOADING FUNCTIONS AND DB CALLS
function reloadDB() {
    // CLEARS GLOBAL VARIABLES
    managersArry = [{ name: "None", managerID: null },];
    employeeArry = [];
    roleArry = [{ name: "None", roleID: null, fkSalary: 0, fkDept: 0 }];
    deptArry = [{ name: "None", deptId: 0 }];

    // --------------------------------------------------------------------------------------------------
    //  FINDS ALL MANAGERS WITH THEIR CORRESPONDING FK_ID AND PLACES IT IN AN ARRAY FOR LATER USE
    // --------------------------------------------------------------------------------------------------

    db.employee.findAll({ raw: true })
        .then(mObj => {
            mObj.forEach((o, i) => {
                let oPlaceholder = {
                    managerID: o.id,
                    name: o.firstName + " " + o.lastName,
                    fName: o.firstName,
                    lName: o.lastName,
                    fkRole: o.fk_role,
                    id: o.id
                }
                managersArry.push(oPlaceholder); //Loads Array for Managers
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
    // FINDS ALL DEPARTMENTS, ROLES, EMPLOYEES -- FOR VIEWING TABLES 
    // --------------------------------------------------------------------------------------------------
    db.employee.findAll({

        include: [db.role],
        // where: {
        //     fk_instrument: instrIndex
        // },
        raw: true
    })
        .then(entireDB => {
            entireDB.forEach((o, i) => {
                let tPlaceholder = {
                    Employee_Id: o.id,
                    First_Name: o.firstName,
                    Last_Name: o.lastName,
                    Job_Title: o["role.title"],
                }
                employeeArry.push(tPlaceholder);
            })
        });

    // --------------------------------------------------------------------------------------------------
    // FINDS ALL DEPARTMENTS 
    // --------------------------------------------------------------------------------------------------

    db.department.findAll({ raw: true })
        .then(dep => {
            dep.forEach((o, i) => {
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
                choices: ['View Data Tables', 'Add New Employee', "Add New Job Role", "Add New Department", "Edit Employee Role", "Exit"]
            },
        ])
        .then((response) => {
            if (response.main_menu_choice === "View Data Tables") {
                reloadDB();
                clear();
                setTimeout(viewDataTables, 700);
            } else if (response.main_menu_choice === "Add New Employee") {
                reloadDB();
                clear();
                setTimeout(addEmployee, 700);
            } else if (response.main_menu_choice === "Edit Employee Role") {
                reloadDB();
                clear();
                setTimeout(updateRole, 700);
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
function printEmployeeTable() {
    const table = empTable.getTable(employeeArry);
    console.log(table);

    INQ
        .prompt([
            {
                type: 'list',
                name: 'main_menu_choice',
                choices: ["Return to Main Menu", "Exit"]
            },
        ])
        .then((response) => {
            if (response.main_menu_choice === "Return to Main Menu") {
                reloadDB();
                clear();
                setTimeout(mainMenu, 700);
            } else if (response.main_menu_choice === "Exit") {
                clear();
                console.log("Exiting . . . ");
            }
        }).catch(err => {
            console.log("An error has occured -->: " + err)
        })
}
// ================================================================================
// VIEW ROLE TABLE
// ================================================================================
function printRoleTable() {
    const table = empTable.getTable(roleArry);
    console.log(table);

    INQ
        .prompt([
            {
                type: 'list',
                name: 'main_menu_choice',
                choices: ["Return to Main Menu", "Exit"]
            },
        ])
        .then((response) => {
            if (response.main_menu_choice === "Return to Main Menu") {
                reloadDB();
                clear();
                setTimeout(mainMenu, 700);
            } else if (response.main_menu_choice === "Exit") {
                clear();
                console.log("Exiting . . . ");
            }
        }).catch(err => {
            console.log("An error has occured -->: " + err)
        })
}

// ================================================================================
// VIEW DEPARTMENT TABLE
// ================================================================================
function printDeptTable() {
    const table = empTable.getTable(deptArry);
    console.log(table);
    INQ
        .prompt([
            {
                type: 'list',
                name: 'main_menu_choice',
                choices: ["Return to Main Menu", "Exit"]
            },
        ])
        .then((response) => {
            if (response.main_menu_choice === "Return to Main Menu") {
                reloadDB();
                clear();
                setTimeout(mainMenu, 700);
            } else if (response.main_menu_choice === "Exit") {
                clear();
                console.log("Exiting . . . ");
            }
        }).catch(err => {
            console.log("An error has occured -->: " + err)
        })
}

// ================================================================================
// VIEW EMPLOYEES TABLE OPTIONS
// ================================================================================
function viewDataTables() {
    reloadDB();
    INQ
        .prompt([
            {
                type: 'list',
                name: 'view_menu_choice',
                message: 'Please pick from the choices below',
                choices: [
                    'View all employees',
                    'View all departments',
                    'View all employee roles',
                    'Return to main menu',
                    'Exit']
            },
        ])
        .then((response) => {
            if (response.view_menu_choice === "View all employees") {
                console.log("EMPLOYEE TABLE:");
                console.log("--------------------------------------------------------");
                setTimeout(printEmployeeTable, 300);
            } else if (response.view_menu_choice === "View all departments") {
                console.log("DEPARTMENT TABLE:");
                console.log("--------------------------------------------------------");
                setTimeout(printDeptTable, 300);
            } else if (response.view_menu_choice === "View all employee roles") {
                console.log("ROLE TABLE:");
                console.log("--------------------------------------------------------");
                setTimeout(printRoleTable, 300);
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
    reloadDB();
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
    reloadDB();
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
// UPDATE EMPLOYEE JOB ROLE 
// ================================================================================
function updateRole() {
    INQ
        .prompt([
            {
                type: 'list',
                message: "Choose Role to:",
                name: 'rolePick',
                choices: roleArry
            },
            {
                name: 'role',
                message: "Insert new role title:",
            },
            {
                name: 'salary',
                message: "Insert new role default salary:",
            },
            {
                type: 'list',
                message: "Choose Department belonging to edited role:",
                name: 'dept',
                choices: deptArry
            }
        ])
        .then(obj => {

            let newDept_id = deptArry.find((o, i) => { return o.name === obj.dept })
            let newRole_id = roleArry.find((o, i) => { return o.name === obj.rolePick })

            // let testObj = {
            //     title: obj.role,
            //     salary: obj.salary,
            //     fk_department: newDept_id["deptId"],
            // }


            db.role.update(
                {
                    title: obj.role,
                    salary: obj.salary,
                    fk_department: newDept_id["deptId"],
                },
                { where: { id: newRole_id["roleID"] } });



            clear();
            reloadDB();
            clear();
            console.log("Employee Role Updated!")
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
    reloadDB();
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
setTimeout(mainMenu, 1500);


