export default function(sequelize, Sequelize) {

    const HopitalHasSpecialite = sequelize.define("hopitalHasSpecialite", {
        idhopital: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        isspecialite: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },

    }, {
        freezeTableName: true,
        tableName: 'hopitalHasSpecialite',
        createdAt: false,
        updatedAt: false
    });
    HopitalHasSpecialite.associate = function(models) {
        HopitalHasSpecialite.belongsTo(models.hopital, {
            foreignKey: 'idhopital',
        });
        HopitalHasSpecialite.belongsTo(models.specialite, {
            foreignKey: 'idspecialite',
        });
    };
    return HopitalHasSpecialite
};