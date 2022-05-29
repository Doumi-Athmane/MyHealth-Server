export default function(sequelize, Sequelize) {

    const Message = sequelize.define("message", {
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
        tableName: 'message',
        createdAt: false,
        updatedAt: false
    });
    Message.associate = function(models) {
        Message.belongsTo(models.patient, {
            foreignKey: 'id_patient',
        });
        Message.belongsTo(models.medecin, {
            foreignKey: 'id_medecin',
        });
    };
    return Message
};