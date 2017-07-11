'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('drives', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            scheduledOn: {
                type: Sequelize.DATE,
                field: 'scheduled_on',
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
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
        return queryInterface.dropTable('drives');
    }
};