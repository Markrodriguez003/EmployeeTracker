module.exports = (sequelize, DataTypes) => {
    const employee = sequelize.define("employee", {

        firstName: {
            type: DataTypes.STRING(30)
        },
        lastName: {
            type: DataTypes.STRING(30)
        }
    });

    employee.associate = (models) => {
        employee.belongsTo(models.role, {
            foreignKey: 'fk_role',
            allowNull: false
        });

        employee.hasOne(models.employee, {
            foreignKey: 'fk_manager',
            allowNull: true
        });
    };

    return employee;
};