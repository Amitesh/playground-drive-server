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
                type: Sequelize.INTEGER,
                references: {
                    model: 'candidates',
                    key: 'id'
                }
            },
            driveId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'drives',
                    key: 'id'
                }
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
        return queryInterface.dropTable('drives_candidates');
    }
};