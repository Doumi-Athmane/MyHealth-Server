export default function(sequelize, Sequelize) {

    const AlerteForProche = sequelize.define("alerteForProche", {
        id_alerte: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        id_proche: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },

    }, {
        freezeTableName: true,
        tableName: 'alerteForProche',
        createdAt: false,
        updatedAt: false
    });
    AlerteForProche.associate = function(models) {
        AlerteForProche.belongsTo(models.prochePatient, {
            foreignKey: 'id_proche',
        });
        AlerteForProche.belongsTo(models.alerte, {
            foreignKey: 'id_alerte',
        });
    };
    return AlerteForProche
};