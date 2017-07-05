/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User', {
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
      allowNull: true
    },
    name: {
      type: DataTypes.CHAR(256),
      field: 'name',
      allowNull: false
    },
    email: {
      type: DataTypes.CHAR(256),
      field: 'email',
      allowNull: true
    },
    password: {
      type: DataTypes.CHAR(256),
      field: 'password',
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
    tableName: 'users',
    timestamps: false
  })
}

module.exports.initRelations = () => {
  delete module.exports.initRelations // Destroy itself to prevent repeated calls.

  const model = require('../index')
  const User = model.User
  const HiringStatus = model.HiringStatus
  const DrivesCandidate = model.DrivesCandidate

  User.hasMany(HiringStatus, {
    as: 'HiringStatusFk0s',
    foreignKey: 'user_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })

  User.belongsToMany(DrivesCandidate, {
    as: 'HiringStatusDriveCandidates',
    through: HiringStatus,
    foreignKey: 'user_id',
    otherKey: 'drive_candidate_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
}
