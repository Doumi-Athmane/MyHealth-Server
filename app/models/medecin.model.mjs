export default function(sequelize, Sequelize) {

    const Medecin = sequelize.define("medecin", {
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
        idspecialite: {
            type: Sequelize.STRING(255)
        },
        idhopital: {
            type: Sequelize.STRING(255)

        },

    }, {
        freezeTableName: true,
        tableName: 'medecin',
        createdAt: false,
        updatedAt: false
    });
    Medecin.associate = function(models) {
        Medecin.belongsTo(models.specialite, {
            foreignKey: 'idspecialite',
        });
        Medecin.belongsTo(models.hopital, {
            foreignKey: 'idhopital',
        });
    };
    return Medecin
};