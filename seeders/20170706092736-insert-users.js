'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('users', [{
            eid: '3577',
            name: 'Amitesh Kumar',
            email: 'amitesh.kumar3755@altimetrik.com',
            password: 'amitesh'
        }, {
            eid: '3574',
            name: 'Sagar Suryawanshi',
            email: 'ssuryawanshi@altimetrik.com',
            password: 'sagar'
        }], {});
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.bulkDelete('users', null, {});
    }
};
