'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('candidates', [
            /*{
            firstname: 'Amitesh',
            lastname: 'Kumar',
            email: 'amitesh.kumar3755@altimetrik.com',
            phone: '123',
            stream: 'UI',
            role: 'Architect'
        }, {
            firstname: 'Sagar',
            lastname: 'Suryawanshi',
            email: 'ssuryawanshi@altimetrik.com',
            phone: '123',
            stream: 'UI',
            role: 'Lead'
        }, {
            firstname: 'Smita',
            lastname: 'Sinha',
            email: 'ssinha@altimetrik.com',
            phone: '123',
            stream: 'HR',
            role: 'manager'
        }
        */], {});
    },

    down: function (queryInterface, Sequelize) {
        queryInterface.bulkDelete('candidates', null, {});
    }
};
