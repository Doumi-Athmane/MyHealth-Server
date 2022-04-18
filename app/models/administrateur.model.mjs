export default function(sequelize, Sequelize) {

    const Admin = sequelize.define("administrateur", {
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
        idhopital: {
            type: Sequelize.INTEGER,
        },

    }, {
        freezeTableName: true,
        tableName: 'administrateur',
        createdAt: false,
        updatedAt: false
    });
    Admin.associate = function(models) {
        Admin.belongsTo(models.hopital, {
            foreignKey: 'idhopital',
        });
    };
    return Admin
};