'use strict';
module.exports = function (sequelize, DataTypes) {
    var user = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        eid: {
            type: DataTypes.CHAR(256),
            field: 'eid',
            allowNull: false
        },
        name: {
            type: DataTypes.CHAR(256),
            field: 'name',
            allowNull: false
        },
        email: {
            type: DataTypes.CHAR(256),
            field: 'email',
            allowNull: false
        },
        password: {
            type: DataTypes.CHAR(256),
            field: 'password',
            allowNull: false
        }
    }, {
        timestamps: true,
        tableName: 'users',
        classMethods: {
            associate: function (models) {
                const User = models.User
                const HiringStatus = models.HiringStatus
                const DrivesCandidate = models.DrivesCandidate

                User.hasMany(HiringStatus, {
                    as: 'HiringStatusFk0s',
                    foreignKey: 'user_id',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                })

                User.belongsToMany(DrivesCandidate, {
                    as: 'HiringStatusDriveCandidates',
                    through: HiringStatus,
                    foreignKey: 'user_id',
                    otherKey: 'drive_candidate_id',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                })
            }
        }
    });
    return user;
};