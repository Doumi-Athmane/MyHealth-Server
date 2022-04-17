module.exports = function(sequelize, Sequelize) {

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
        id_medecin: {
            type: Sequelize.INTEGER
        },
        idhopital: {
            type: Sequelize.INTEGER
        },

    }, {
        freezeTableName: true,
        tableName: 'patient',
        createdAt: false,
        updatedAt: false
    });
    Reservation.associate = function(models) {
        Reservation.belongsTo(models.locataire, {
            foreignKey: 'idLocataire',

        });
    };
    return Patient
};