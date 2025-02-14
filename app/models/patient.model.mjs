export default function(sequelize, Sequelize) {

    const Patient = sequelize.define("patient", {
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
        age: {
            type: Sequelize.INTEGER
        },
        sexe: {
            type: Sequelize.STRING(255)
        },
        numeroDeTelephone: {
            type: Sequelize.STRING(255)
        },
        adresse: {
            type: Sequelize.STRING(255)
        },
        email: {
            type: Sequelize.STRING(50)
        },
        motDePasse: {
            type: Sequelize.STRING(255)
        },
        id_medecin: {
            type: Sequelize.INTEGER
        },
        idhopital: {
            type: Sequelize.INTEGER,
        },

    }, {
        freezeTableName: true,
        tableName: 'patient',
        createdAt: false,
        updatedAt: false
    });
    Patient.associate = function(models) {
        Patient.belongsTo(models.medecin, {
            foreignKey: 'id_medecin',
        });
        Patient.belongsTo(models.hopital, {
            foreignKey: 'idhopital',
        });
    };

    return Patient
};