
// Grabs our DB and its models
const db = require("../models");

// Employee Seeds
module.exports.seed = 


console.log("LOADING SEEDS")

// EXAMPLE EMPLOYEE SEEDS
let employeeSeeds = [
    { firstName: "Maria", lastName: "Albenjiad", fk_role: 5, fk_manager: null }, // LEAD ENGINEER || NO MANAGER
    { firstName: "Diego", lastName: "Santiago", fk_role: 6, fk_manager: 1 }, // SOFTWARE ENGINEER || MANAGER: MARIA ALBENJIAD ||
    { firstName: "Lester", lastName: "Holzen", fk_role: 4, fk_manager: null }, // LEAD LEGAL || NO MANAGER
    { firstName: "Sebastiana", lastName: "De La Roche", fk_role: 3, fk_manager: 3 }, // LAWYER || MANAGER: LESTER HOLZEN ||
    { firstName: "Johnny", lastName: "Macintyre", fk_role: 3, fk_manager: 3 }, // LAWYER || MANAGER: LESTER HOLZEN ||
    { firstName: "Susie", lastName: "Martinez", fk_role: 1, fk_manager: null }, // ACCOUNTANT || MANAGER: NULL ||
    { firstName: "Kyle", lastName: "Ocala", fk_role: 9, fk_manager: null }, // GRAPHIC DESIGNER || MANAGER: HUNTER TONSKY ||
    { firstName: "Stephen", lastName: "Arcadia", fk_role: 9, fk_manager: null }, // GRAPHIC DESIGNER || MANAGER: HUNTER TONSKY ||
    { firstName: "Hunter", lastName: "Tonsky", fk_role: 10, fk_manager: null }, // GRAPHIC DESIGNER || MANAGER: NULL ||
    { firstName: "Joanna", lastName: "Junis", fk_role: 8, fk_manager: null }, // SALES LEAD || MANAGER: NULL ||
    { firstName: "Yessica", lastName: "Labreu", fk_role: 7, fk_manager: 10 }, // SALESPERSON || MANAGER: JOANNA JUNIS ||
    { firstName: "Frank", lastName: "Corozza", fk_role: 2, fk_manager: null } // SALESPERSON || MANAGER: JOANNA JUNIS ||
];

// DEPARTMENT SEEDS
let deptSeeds = [
    { dept: 'Accounting' }, { dept: 'Engineering' }, { dept: 'Legal' }, { dept: 'Sales' }, { dept: 'Art & Design' },
];

// EMPLOYEE ROLE SEEDS  
let roleSeeds = [
    { title: 'Accountant', salary: 53000.00, fk_department: 1 },
    { title: 'Account Manager', salary: 58000.00, fk_department: 1 },
    { title: 'Lawyer', salary: 68000.00, fk_department: 3 },
    { title: 'Legal Team Lead', salary: 78000.00, fk_department: 3 },
    { title: 'Lead Engineer', salary: 88000.00, fk_department: 2 },
    { title: 'Software Engineer', salary: 78000.00, fk_department: 2 },
    { title: 'Salesperson', salary: 43000.00, fk_department: 4 },
    { title: 'Sales Lead', salary: 50000.00, fk_department: 4 },
    { title: 'Graphic Designer', salary: 52000.00, fk_department: 5 },
    { title: 'Graphic Designer Lead', salary: 58000.00, fk_department: 5 },
];
 
db.sequelize.sync({ force: true }).then((err) => {

   
    //-----------------------------------------------------------
    // LOADING DEPARTMENT SEEDS || IMPORTANT
    db.department.bulkCreate(deptSeeds, {   }).then(() => {
        console.log("Department seeds loaded");
    }).catch((err) => {
        console.log("Failed to load departments");
        console.log(err);
    }).finally(console.log("Leaving departments seeder"));

    //-----------------------------------------------------------
    // LOADING ROLE SEEDS || IMPORTANT
    db.role.bulkCreate(roleSeeds, {   }).then(() => {
        console.log("Role seeds loaded");
    }).catch((err) => {
        console.log("Failed to load roles");
        console.log(err);
    }).finally(console.log("Leaving roles seeder"));

    //-----------------------------------------------------------
    // LOADING EMPLOYEE SEEDS (EXAMPLE EMPLOYEES) 
    function loadExampleEmployees(){
        db.employee.bulkCreate(employeeSeeds, {}).then(() => {
            console.log("Employee seeds loaded");
        }).catch((err) => {
            console.log("Failed to load employees");
            console.log(err);
        }).finally(console.log("Leaving employee seeder"));
    }

    setTimeout(loadExampleEmployees, 5000);
});


