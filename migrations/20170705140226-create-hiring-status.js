'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('hiring_statuses', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            status: {
                type: Sequelize.STRING
            },
            comment: {
                type: Sequelize.STRING
            },
            userId: {
                field: 'user_id',
                type: Sequelize.INTEGER
            },
            drivesCandidateId: {
                field: 'drives_candidate_id',
                type: Sequelize.INTEGER,
                references: {
                    model: 'drives_candidates',
                    key: 'id'
                }
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
        return queryInterface.dropTable('hiring_statuses');
    }
};