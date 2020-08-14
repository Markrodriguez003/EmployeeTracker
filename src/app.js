const INQ = require("inquirer"); // Bring in inquire module
const FIG = require("figlet");

const { clear } = require("console"); // ? Does this work ??

// Grabs our DB and its models
const db = require("../models");

// const DB_CALLS = require("");

// ================================================================================
// SPLASH GRAPHIC
// ================================================================================

function splashGraphic() {
    clear();
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
        console.log(data);
    });
}

// ================================================================================
// MAIN MENU
// ================================================================================
function mainMenu() { // INITIAL MAIN MENU
    // ascii_art_generator.bar();
    INQ
        .prompt([
            {
                type: 'list',
                name: 'main_menu_choice',
                message: 'Welcome to Employee Tracker. Please pick from the choices below',
                choices: ['Instructions', 'View Employees', 'Add New Employee', "Edit Employee", "Exit"]
            },
        ])
        .then((response) => {
            if (response.main_menu_choice === "Instructions") {
                console.log("Instructions!");
            } else if (response.main_menu_choice === "View Employees") {
                console.log("Viewing!");
                clear();
                viewEmployees();
            } else if (response.main_menu_choice === "Add New Employee") {
                console.log("Adding!");
                addEmployee();
            } else if (response.main_menu_choice === "Edit Employee") {
                console.log("Editing! ");
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
                mainMenu();
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

    console.log("Please enter employee information below when prompted.")
    INQ
        .prompt([
            {
                name: 'f_name',
                message: "First name:",
            },
            {
                name: 'l_name',
                message: "Last name:",
            },
            {
                name: 'role',
                message: "Job title:",

            },
            {
                name: 'department',
                message: "Department",
            },
            {
                name: 'manager',
                message: "Manager/Supervisor",
            },
            {
                name: 'salary',
                message: "Yearly salary",
            }
        ])
        .then(employeeObj => {

            console.log("Employee Name --> : " + JSON.stringify(employeeObj));

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
// VIEW JOB ROLE OPTIONS 
// ================================================================================
function viewJobRoles() {
    console.log("Select a job role")
    INQ
        .prompt([
            {
                type: 'list',
                name: 'view_role_choice',
                choices: [
                    'Accountant',
                    'Account Manager',
                    'Lawyer',
                    'Lead Engineer',
                    'Legal Team Lead',
                    'Salesperson',
                    'Sales Lead',
                    'Software Engineer'
                ]
            },
        ])
        .then((response) => {
            if (response.view_role_choice === "Accountant") {
                console.log("Accountant!");
                return "Accountant!";
            } else if (response.view_role_choice === "Account Manager") {
                console.log("Account Manager!");
                return "Account Manager";
            } else if (response.view_role_choice === "Lawyer") {
                console.log("Lawyer!");
                return "Lawyer";
            } else if (response.view_role_choice === "Lead Engineer") {
                console.log("Lead Engineer!");
                return "Lead Engineer";
            } else if (response.view_role_choice === "Legal Team Lead") {
                console.log("Legal Team Lead!");
                return "Legal Team Lead";
            } else if (response.view_role_choice === "Sales Lead") {
                console.log("Salesperson!");
                return "Salesperson";
            } else if (response.view_role_choice === "Sales Lead") {
                console.log("Sales Lead!");
                return "Sales Lead";
            } else if (response.view_role_choice === "Software Engineer") {
                console.log("Software Engineer!");
                return "Software Engineer";
            } else {
                console.log("Exiting . . . ");
            }
        })
        .catch((err) => {
            console.log("Error -->> View employee role choice error: " + err);
        })

}

// Sequelize Sync
db.sequelize.sync({ force: true }).then((err) => {
    // instrument array of objects to load instrument table
    // const instr = [
    //     { instrument: "guitar" },
    //     { instrument: "bass" },
    //     { instrument: "drums" },
    //     { instrument: "percussion" },
    //     { instrument: "brass" },
    //     { instrument: "woodwind" },
    //     { instrument: "synthesizer" },
    //     { instrument: "studio" },
    //     { instrument: "dj" }
    // ];

    // db.cb_Instrument.bulkCreate(instr, { validate: true }).then(() => {
    //     console.log("Instrument loaded");
    // }).catch((err) => {
    //     console.log("Failed to load instruments");
    //     console.log(err);
    // }).finally(console.log("..."));

});

// splashGraphic();
mainMenu();


