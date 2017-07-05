'use strict';
module.exports = function (sequelize, DataTypes) {
    var drivescandidate = sequelize.define('drivescandidate', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        driveId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'drives',
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
        candidateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'candidates',
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        }
    }, {
        timestamps: true,
        tableName: 'drives_candidates',
        classMethods: {
            associate: function (models) {
                const DrivesCandidate = models.DrivesCandidate
                const HiringStatus = models.HiringStatus
                const UserTestResult = models.UserTestResult
                const Drive = models.Drive
                const Candidate = models.Candidate
                const User = models.User
                const TestType = models.TestType

                DrivesCandidate.hasMany(HiringStatus, {
                    as: 'HiringStatusFk1s',
                    foreignKey: 'drive_candidate_id',
                    onDelete: 'NO ACTION',
                    onUpdate: 'NO ACTION'
                })

                DrivesCandidate.hasMany(UserTestResult, {
                    as: 'UserTestResultsFk1s',
                    foreignKey: 'drive_candidate_id',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                })

                DrivesCandidate.belongsTo(Drive, {
                    as: 'Drive',
                    foreignKey: 'drive_id',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                })

                DrivesCandidate.belongsTo(Candidate, {
                    as: 'Candidate',
                    foreignKey: 'candidate_id',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                })

                DrivesCandidate.belongsToMany(User, {
                    as: 'HiringStatusUsers',
                    through: HiringStatus,
                    foreignKey: 'drive_candidate_id',
                    otherKey: 'user_id',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                })

                DrivesCandidate.belongsToMany(TestType, {
                    as: 'UserTestResultTestTypes',
                    through: UserTestResult,
                    foreignKey: 'drive_candidate_id',
                    otherKey: 'test_type_id',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                })
            }
        }
    });
    return drivescandidate;
};