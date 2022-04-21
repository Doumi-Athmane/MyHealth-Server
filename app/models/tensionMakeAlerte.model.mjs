export default function(sequelize, Sequelize) {

    const TensionMakeAlerte = sequelize.define("tensionMakeAlerte", {
        id_alerte: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        id_tension: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },

    }, {
        freezeTableName: true,
        tableName: 'tensionMakeAlerte',
        createdAt: false,
        updatedAt: false
    });
    TensionMakeAlerte.associate = function(models) {
        TensionMakeAlerte.belongsTo(models.tensionArterielle, {
            foreignKey: 'id_tension',
        });
        TensionMakeAlerte.belongsTo(models.alerte, {
            foreignKey: 'id_alerte',
        });
    };
    return TensionMakeAlerte
};