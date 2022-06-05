export default function(sequelize, Sequelize) {

    const FrequanceCardiaque = sequelize.define("frequanceCardiaque", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        valeur: {
            type: Sequelize.FLOAT
        },
        temps: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
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
        tableName: 'frequanceCardiaque',
        createdAt: false,
        updatedAt: false
    });
    FrequanceCardiaque.associate = function(models) {
        FrequanceCardiaque.belongsTo(models.patient, {
            foreignKey: 'id_patient',
        });
    };
    return FrequanceCardiaque
};