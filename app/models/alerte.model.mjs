export default function(sequelize, Sequelize) {

    const Alerte = sequelize.define("alerte", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        titre: {
            type: Sequelize.TEXT
        },
        valeur: {
            type: Sequelize.TEXT
        },
        temps: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        id_patient: {
            type: Sequelize.INTEGER
        },
        id_medecin: {
            type: Sequelize.INTEGER,
        },

    }, {
        freezeTableName: true,
        tableName: 'alerte',
        createdAt: false,
        updatedAt: false
    });
    Alerte.associate = function(models) {
        Alerte.belongsTo(models.patient, {
            foreignKey: 'id_patient',
        });
        Alerte.belongsTo(models.medecin, {
            foreignKey: 'id_medecin',
        });
    };
    return Alerte
};