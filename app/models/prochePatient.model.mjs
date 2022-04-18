export default function(sequelize, Sequelize) {

    const Proche = sequelize.define("prochePatient", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nom: {
            type: Sequelize.STRING(255)
        },
        prenom: {
            type: Sequelize.STRING(255)
        },
        numero_de_telephone: {
            type: Sequelize.STRING(255)
        },
        adresse: {
            type: Sequelize.STRING(255)
        },
        email: {
            type: Sequelize.STRING(50)
        },
        mot_de_passe: {
            type: Sequelize.STRING(255)
        },
        id_patient: {
            type: Sequelize.INTEGER
        },
        idhopital: {
            type: Sequelize.INTEGER,
        },

    }, {
        freezeTableName: true,
        tableName: 'prochePatient',
        createdAt: false,
        updatedAt: false
    });
    Proche.associate = function(models) {
        Proche.belongsTo(models.patient, {
            foreignKey: 'id_patient',
        });
        Proche.belongsTo(models.hopital, {
            foreignKey: 'idhopital',
        });
    };
    return Proche
};