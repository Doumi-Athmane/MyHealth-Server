export default function(sequelize, Sequelize) {

    const Hopital = sequelize.define("hopital", {
        idhopital: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nomhopital: {
            type: Sequelize.STRING(255)
        },
        wilaya: {
            type: Sequelize.STRING(255)
        },
        commune: {
            type: Sequelize.STRING(255)
        },
        adresse: {
            type: Sequelize.STRING(255)
        }

    }, {
        freezeTableName: true,
        tableName: 'hopital',
        createdAt: false,
        updatedAt: false
    });
    return Hopital
};