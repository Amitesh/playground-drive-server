'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('candidates', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            firstname: {
                type: Sequelize.STRING
            },
            lastname: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            stream: {
                type: Sequelize.STRING
            },
            role: {
                type: Sequelize.STRING
            },
            createdAt: {
                field: 'created_at',
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('NOW()')
            },
            updatedAt: {
                field: 'updated_at',
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('NOW()')
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('candidates');
    }
};