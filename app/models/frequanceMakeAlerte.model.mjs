export default function(sequelize, Sequelize) {

    const FrequanceMakeAlerte = sequelize.define("frequanceMakeAlerte", {
        id_alerte: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        id_frequance: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },

    }, {
        freezeTableName: true,
        tableName: 'frequanceMakeAlerte',
        createdAt: false,
        updatedAt: false
    });
    FrequanceMakeAlerte.associate = function(models) {
        FrequanceMakeAlerte.belongsTo(models.frequanceCardiaque, {
            foreignKey: 'id_frequence',
        });
        FrequanceMakeAlerte.belongsTo(models.alerte, {
            foreignKey: 'id_alerte',
        });
    };
    return FrequanceMakeAlerte
};