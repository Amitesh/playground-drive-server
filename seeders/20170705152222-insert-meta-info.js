'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        /*
         Add altering commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.bulkInsert('Person', [{
         name: 'John Doe',
         isBetaMember: false
         }], {});
         */

        return queryInterface.bulkInsert('meta_info', [{
            streams: 'qa,java,web ui',
            roles: 'lead,developer',
            participated: 'yes,no',
            status: 'Hold,In progress,Clear',
            hitingStatus: 'selected,rejected',
            createdAt: Sequelize.literal('now()'),
            updatedAt: Sequelize.literal('now()')
        }], {});
    },

    down: function (queryInterface, Sequelize) {
        /*
         Add reverting commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.bulkDelete('Person', null, {});
         */
        return queryInterface.bulkDelete('meta_info', null, {});
    }
};
