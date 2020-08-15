
// Grabs our DB and its models
const db = require("../models");

// Employee Seeds
module.exports.seed = console.log("LOADING SEEDS")

// Employee Seeds
let employeeSeeds = [

    {
        firstName: "Diego",
        lastName: "Santiago",
    },

    {
        firstName: "Maria",
        lastName: "Albenjiad",
    },
    {
        firstName: "Lester",
        lastName: "Holzen",
    },
    {
        firstName: "Sebastiana",
        lastName: "De La Roche",
    },
    {
        firstName: "Johnny",
        lastName: "Cage",
    },
]

// Department Seeds
let deptSeeds = [
    { dept: 'Finance' },
    { dept: 'Legal' },
    { dept: 'Engineering' },
    { dept: 'Sales' },
    { dept: 'Art & Design' }
]

const roleList = [
    'Accountant',
    'Account Manager',
    'Lawyer',
    'Lead Engineer',
    'Legal Team Lead',
    'Salesperson',
    'Sales Lead',
    'Software Engineer'
]

let roleSeeds = [
    { title: roleList[3] 
      
    }

]



db.sequelize.sync({ force: true }).then((err) => {
    db.employee.bulkCreate(employeeSeeds, { validate: true }).then(() => {
        console.log("Employee seeds loaded");
    }).catch((err) => {
        console.log("Failed to load employees");
        console.log(err);
    }).finally(console.log("Leaving employee seeder"));

    db.department.bulkCreate(deptSeeds, { validate: true }).then(() => {
        console.log("Department seeds loaded");
    }).catch((err) => {
        console.log("Failed to load departments");
        console.log(err);
    }).finally(console.log("Leaving departments seeder"));

});


