'use strict';
module.exports = function (sequelize, DataTypes) {
    var candidatesTestResult = sequelize.define('candidatesTestResult', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        participated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        score: DataTypes.INTEGER,
        status: DataTypes.STRING,
        testTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'test_types',
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
        drivesCandidateId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'drives_candidates',
                key: 'id',
                deferrable: sequelize.Deferrable.INITIALLY_DEFERRED
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        }
    }, {
        timestamps: true,
        tableName: 'candidates_test_results',
        classMethods: {
            associate: function (models) {
                // associations can be defined here
                const CandidatesTestResult = models.CandidatesTestResult;
                const TestType = models.TestType;
                const DrivesCandidate = models.DrivesCandidate;

                CandidatesTestResult.belongsTo(TestType, {
                    as: 'testTypes',
                    foreignKey: 'test_type_id',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });

                CandidatesTestResult.belongsTo(DrivesCandidate, {
                    as: 'DriveCandidate',
                    foreignKey: 'drive_candidate_id',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                })
            }
        }
    });
    return candidatesTestResult;
};