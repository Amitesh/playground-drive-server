/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Drive', {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dateOn: {
      type: DataTypes.DATE,
      field: 'date_on',
      allowNull: false
    },
    name: {
      type: DataTypes.CHAR(256),
      field: 'name',
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
    tableName: 'drives',
    timestamps: false
  })
}

module.exports.initRelations = () => {
  delete module.exports.initRelations // Destroy itself to prevent repeated calls.

  const model = require('../index')
  const Drive = model.Drive
  const DrivesCandidate = model.DrivesCandidate
  const Candidate = model.Candidate

  Drive.hasMany(DrivesCandidate, {
    as: 'CandidatesFk0s',
    foreignKey: 'drive_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })

  Drive.belongsToMany(Candidate, {
    as: 'DrivesCandidateCandidates',
    through: DrivesCandidate,
    foreignKey: 'drive_id',
    otherKey: 'candidate_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
}
