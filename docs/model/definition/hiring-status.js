/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('HiringStatus', {
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
      onUpdate: 'NO ACTION',
      onDelete: 'NO ACTION'
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
    status: {
      type: DataTypes.INTEGER,
      field: 'status',
      allowNull: false
    },
    comment: {
      type: DataTypes.TEXT,
      field: 'comment',
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
    tableName: 'hiring_status',
    timestamps: false
  })
}

module.exports.initRelations = () => {
  delete module.exports.initRelations // Destroy itself to prevent repeated calls.

  const model = require('../index')
  const HiringStatus = model.HiringStatus
  const User = model.User
  const DrivesCandidate = model.DrivesCandidate

  HiringStatus.belongsTo(User, {
    as: 'User',
    foreignKey: 'user_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })

  HiringStatus.belongsTo(DrivesCandidate, {
    as: 'DriveCandidate',
    foreignKey: 'drive_candidate_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
}
