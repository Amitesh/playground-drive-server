'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('test_types', [{
            name: 'Mettl',
            'order': 0
        }, {
            name: 'Mini PG',
            'order': 1
        }, {
            name: 'PG',
            'order': 2
        }], {});
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.bulkDelete('test_types', null, {});
    }
};
