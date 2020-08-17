module.exports = (sequelize, DataTypes) => {
    const role = sequelize.define("role", {


        title: {
            type: DataTypes.STRING(30),

        },
        salary: {
            type: DataTypes.DECIMAL(10, 2),
            timestamps: false,
        },

    }, { timestamps: false, });

    role.associate = (models) => {
        role.hasOne(models.employee, {
            foreignKey: 'fk_role',
            allowNull: false
        });

        role.belongsTo(models.department, {
            foreignKey: 'fk_department',
            allowNull: false
        });
    };

    return role;
};
