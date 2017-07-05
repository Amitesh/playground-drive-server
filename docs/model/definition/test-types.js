/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('TestType', {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.CHAR(256),
      field: 'name',
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER,
      field: 'order',
      allowNull: false
    },
    createdOn: {
      type: DataTypes.DATE,
      field: 'created_on',
      allowNull: false
    },
    updatedOn: {
      type: DataTypes.DATE,
      field: 'updated_on',
      allowNull: false
    }
  }, {
    schema: 'public',
    tableName: 'test_types',
    timestamps: false
  })
}

module.exports.initRelations = () => {
  delete module.exports.initRelations // Destroy itself to prevent repeated calls.

  const model = require('../index')
  const TestType = model.TestType
  const UserTestResult = model.UserTestResult
  const DrivesCandidate = model.DrivesCandidate

  TestType.hasMany(UserTestResult, {
    as: 'UserTestResultsFk0s',
    foreignKey: 'test_type_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })

  TestType.belongsToMany(DrivesCandidate, {
    as: 'UserTestResultDriveCandidates',
    through: UserTestResult,
    foreignKey: 'test_type_id',
    otherKey: 'drive_candidate_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
}
