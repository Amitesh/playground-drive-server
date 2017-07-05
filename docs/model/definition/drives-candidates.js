/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('DrivesCandidate', {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    driveId: {
      type: DataTypes.INTEGER,
      field: 'drive_id',
      allowNull: false,
      references: {
        model: 'drives',
        key: 'id'
      },
      onUpdate: 'NO ACTION',
      onDelete: 'NO ACTION'
    },
    candidateId: {
      type: DataTypes.INTEGER,
      field: 'candidate_id',
      allowNull: false,
      references: {
        model: 'candidates',
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
    tableName: 'drives_candidates',
    timestamps: false
  })
}

module.exports.initRelations = () => {
  delete module.exports.initRelations // Destroy itself to prevent repeated calls.

  const model = require('../index')
  const DrivesCandidate = model.DrivesCandidate
  const HiringStatus = model.HiringStatus
  const UserTestResult = model.UserTestResult
  const Drive = model.Drive
  const Candidate = model.Candidate
  const User = model.User
  const TestType = model.TestType

  DrivesCandidate.hasMany(HiringStatus, {
    as: 'HiringStatusFk1s',
    foreignKey: 'drive_candidate_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })

  DrivesCandidate.hasMany(UserTestResult, {
    as: 'UserTestResultsFk1s',
    foreignKey: 'drive_candidate_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })

  DrivesCandidate.belongsTo(Drive, {
    as: 'Drive',
    foreignKey: 'drive_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })

  DrivesCandidate.belongsTo(Candidate, {
    as: 'Candidate',
    foreignKey: 'candidate_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })

  DrivesCandidate.belongsToMany(User, {
    as: 'HiringStatusUsers',
    through: HiringStatus,
    foreignKey: 'drive_candidate_id',
    otherKey: 'user_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })

  DrivesCandidate.belongsToMany(TestType, {
    as: 'UserTestResultTestTypes',
    through: UserTestResult,
    foreignKey: 'drive_candidate_id',
    otherKey: 'test_type_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
}
