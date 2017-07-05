/* eslint new-cap: "off", global-require: "off" */

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('MetaInfo', {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    streams: {
      type: DataTypes.TEXT,
      field: 'streams',
      allowNull: false
    },
    roles: {
      type: DataTypes.TEXT,
      field: 'roles',
      allowNull: false
    },
    test: {
      type: DataTypes.TEXT,
      field: 'test',
      allowNull: false
    },
    status: {
      type: DataTypes.TEXT,
      field: 'status',
      allowNull: false
    },
    hiringStatus: {
      type: DataTypes.TEXT,
      field: 'hiring_status',
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
    tableName: 'meta_info',
    timestamps: false
  })
}

module.exports.initRelations = () => {
  delete module.exports.initRelations // Destroy itself to prevent repeated calls.
}
