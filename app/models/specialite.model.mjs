export default function(sequelize, Sequelize) {

    const Specialite = sequelize.define("specialite", {
        idspecialite: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nomspecialite: {
            type: Sequelize.STRING(255)
        }

    }, {
        freezeTableName: true,
        tableName: 'cpecialite',
        createdAt: false,
        updatedAt: false
    });
    return Specialite
};