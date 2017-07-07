'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('candidates_test_results', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            participated: {
                type: Sequelize.BOOLEAN
            },
            score: {
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.STRING
            },
            testTypeId: {
                type: Sequelize.STRING
            },
            DrivesCandidateId: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('NOW()')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('NOW()')
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('candidates_test_results');
    }
};