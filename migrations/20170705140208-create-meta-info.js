'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('meta_infos', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            streams: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            roles: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            participated: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            hiringStatus: {
                field: 'hiring_status',
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
        return queryInterface.dropTable('meta_infos');
    }
};