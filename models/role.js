module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define("role", {
   
        title: {
            type: DataTypes.STRING(30)
        },
        salary: {
            type: DataTypes.DECIMAL(10,2)
        }
    });

    role.associate = (models) => {
        role.belongsTo(models.department, {
            foreignKey: 'fk_department',
            allowNull: false
        });
    };

    return role;
};