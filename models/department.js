module.exports = (sequelize, DataTypes) => {
    const department = sequelize.define("department", {
   
        dept: {
            type: DataTypes.STRING
        },
    });

    return department;
};