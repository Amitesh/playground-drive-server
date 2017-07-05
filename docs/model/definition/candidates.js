/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Candidate', {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    firstname: {
      type: DataTypes.CHAR(256),
      field: 'firstname',
      allowNull: false
    },
    lastname: {
      type: DataTypes.CHAR(256),
      field: 'lastname',
      allowNull: true
    },
    email: {
      type: DataTypes.CHAR(256),
      field: 'email',
      allowNull: true
    },
    stream: {
      type: DataTypes.CHAR(256),
      field: 'stream',
      allowNull: false
    },
    role: {
      type: DataTypes.CHAR(256),
      field: 'role',
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
    tableName: 'candidates',
    timestamps: false
  })
}

module.exports.initRelations = () => {
  delete module.exports.initRelations // Destroy itself to prevent repeated calls.

  const model = require('../index')
  const Candidate = model.Candidate
  const DrivesCandidate = model.DrivesCandidate
  const Drive = model.Drive

  Candidate.hasMany(DrivesCandidate, {
    as: 'DrivesCandidatesFk1s',
    foreignKey: 'candidate_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })

  Candidate.belongsToMany(Drive, {
    as: 'DrivesCandidateDrives',
    through: DrivesCandidate,
    foreignKey: 'candidate_id',
    otherKey: 'drive_id',
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION'
  })
}
