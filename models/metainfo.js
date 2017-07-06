'use strict';
module.exports = function (sequelize, DataTypes) {
    var metaInfo = sequelize.define('metaInfo', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        streams: DataTypes.STRING,
        roles: DataTypes.STRING,
        participated: DataTypes.STRING,
        status: DataTypes.STRING,
        hiringStatus: DataTypes.STRING
    }, {
        timestamps: true,
        tableName: 'meta_infos',
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return metaInfo;
};