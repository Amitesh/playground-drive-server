'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('drives', [{
            'scheduled_on': Sequelize.literal('to_timestamp(\'2017-07-22 00:30:00+00\', \'YYYY-MM-DD hh24:mi:ss\')'),
            name: 'QA Drive'
        }, {
            'scheduled_on': Sequelize.literal('to_timestamp(\'2017-07-25 00:30:00+00\', \'YYYY-MM-DD hh24:mi:ss\')'),
            name: 'Women July Drive'
        }, {
            'scheduled_on': Sequelize.literal('to_timestamp(\'2017-07-30 00:30:00+00\', \'YYYY-MM-DD hh24:mi:ss\')'),
            name: 'Web UI Drive'
        }], {});
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.bulkDelete('drives', null, {});
    }
};
