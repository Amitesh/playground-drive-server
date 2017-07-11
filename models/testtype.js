'use strict';
module.exports = function (sequelize, DataTypes) {
    var testType = sequelize.define('testType', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        order: DataTypes.STRING
    }, {
        timestamps: true,
        underscored: true,
        tableName: 'test_types',
        classMethods: {
            associate: function (models) {
                const TestType = models.TestType
                const UserTestResult = models.UserTestResult
                const DrivesCandidate = models.DrivesCandidate

                TestType.hasMany(UserTestResult, {
                    as: 'UserTestResultsFk0s',
                    foreignKey: 'test_type_id',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                })

                TestType.belongsToMany(DrivesCandidate, {
                    as: 'UserTestResultDriveCandidates',
                    through: UserTestResult,
                    foreignKey: 'test_type_id',
                    otherKey: 'drives_candidate_id',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                })
            }
        }
    });
    return testType;
};