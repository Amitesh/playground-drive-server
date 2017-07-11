'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('drives_candidates', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            participated: {
                type: Sequelize.BOOLEAN
            },
            candidateId: {
                field: 'candidate_id',
                type: Sequelize.INTEGER,
                references: {
                    model: 'candidates',
                    key: 'id'
                }
            },
            driveId: {
                field: 'drive_id',
                type: Sequelize.INTEGER,
                references: {
                    model: 'drives',
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
        return queryInterface.dropTable('drives_candidates');
    }
};