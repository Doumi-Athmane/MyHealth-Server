export default function(sequelize, Sequelize) {

    const TensionArterielle = sequelize.define("tensionArterielle", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        valeur: {
            type: Sequelize.FLOAT
        },
        temps: {
            type: Sequelize.DATE
        },
        traiter: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        genererAlerte: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        id_patient: {
            type: Sequelize.INTEGER
        }

    }, {
        freezeTableName: true,
        tableName: 'tensionArterielle',
        createdAt: false,
        updatedAt: false
    });
    TensionArterielle.associate = function(models) {
        TensionArterielle.belongsTo(models.patient, {
            foreignKey: 'id_patient',
        });
    };
    return TensionArterielle
};