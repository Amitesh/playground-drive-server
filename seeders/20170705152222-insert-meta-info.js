'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('meta_infos', [{
            streams: 'qa,java,ui,hr',
            roles: 'architect,lead,developer,manager',
            participated: 'yes,no',
            status: 'Hold,In progress,Clear',
            hiringStatus: 'selected,rejected',
            createdAt: Sequelize.literal('now()'),
            updatedAt: Sequelize.literal('now()')
        }], {});
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.bulkDelete('meta_infos', null, {});
    }
};
