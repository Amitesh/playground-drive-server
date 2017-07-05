/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('UserTestResult', {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    testTypeId: {
      type: DataTypes.INTEGER,
      field: 'test_type_id',
      allowNull: false,
      references: {
        model: 'test_types',
        key: 'id'
      },
      onUpdate: 'NO ACTION',
      onDelete: 'NO ACTION'
    },
    test: {
      type: DataTypes.BOOLEAN,
      field: 'test',
      allowNull: false,
      defaultValue: false
    },
    score: {
      type: DataTypes.INTEGER,
      field: 'score',
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      field: 'status',
      allowNull: false
    },
    driveCandidateId: {
      type: DataTypes.INTEGER,
      field: 'drive_candidate_id',
      allowNull: false,
      references: {
        model: 'drives_candidates',
        key: 'id'
      },
      onUpdate: 'NO ACTION',
      onDelete: 'NO ACTION'
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
    tableName: 'user_test_results',
    timestamps: false
  })
}

module.exports.initRelations = () => {
  delete module.exports.initRelations // Destroy itself to prevent repeated calls.

  const model = require('../index')
  const UserTestResult = model.UserTestResult
  const TestType = model.TestType
  const DrivesCandidate = model.DrivesCandidate

  UserTestResult.belongsTo(TestType, {
    as: 'TestType',
    foreignKey: 'test_type_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })

  UserTestResult.belongsTo(DrivesCandidate, {
    as: 'DriveCandidate',
    foreignKey: 'drive_candidate_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
}
