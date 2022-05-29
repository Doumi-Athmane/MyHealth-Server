export default function(sequelize, Sequelize) {

    const Conseil = sequelize.define("conseil", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        text: {
            type: Sequelize.TEXT
        },
        id_patient: {
            type: Sequelize.INTEGER
        },
        id_medecin: {
            type: Sequelize.INTEGER,
        },

    }, {
        freezeTableName: true,
        tableName: 'conseil',
        createdAt: false,
        updatedAt: false
    });
    Conseil.associate = function(models) {
        Conseil.belongsTo(models.patient, {
            foreignKey: 'id_patient',
        });
        Conseil.belongsTo(models.medecin, {
            foreignKey: 'id_medecin',
        });
    };
    return Conseil
};