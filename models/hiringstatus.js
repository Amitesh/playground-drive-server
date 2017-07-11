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
        drivesCandidateId: {
            type: DataTypes.INTEGER,
            field: 'drives_candidate_id',
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
        underscored: true,
        tableName: 'hiring_statuses',
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
                    foreignKey: 'drives_candidate_id',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                })
            }
        }
    });
    return hiringStatus;
};