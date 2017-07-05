'use strict';
module.exports = function (sequelize, DataTypes) {
    var hiringStatus = sequelize.define('hiringStatus', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.INTEGER,
            field: 'user_id',
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
        driveCandidateId: {
            type: DataTypes.INTEGER,
            field: 'drive_candidate_id',
            allowNull: false,
            references: {
                model: 'drives_candidates',
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
        status: DataTypes.STRING,
        comment: DataTypes.STRING
    }, {
        timestamps: true,
        tableName: 'hiring_status',
        classMethods: {
            associate: function (models) {
                const HiringStatus = models.HiringStatus
                const User = models.User
                const DrivesCandidate = models.DrivesCandidate

                HiringStatus.belongsTo(User, {
                    as: 'User',
                    foreignKey: 'user_id',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                })

                HiringStatus.belongsTo(DrivesCandidate, {
                    as: 'DriveCandidate',
                    foreignKey: 'drive_candidate_id',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                })
            }
        }
    });
    return hiringStatus;
};