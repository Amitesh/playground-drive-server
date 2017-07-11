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
                field: 'test_type_id',
                type: Sequelize.INTEGER,
                references: {
                    model: 'test_types',
                    key: 'id'
                }
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
        return queryInterface.dropTable('candidates_test_results');
    }
};