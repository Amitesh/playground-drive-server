'use strict';
module.exports = function (sequelize, DataTypes) {
    var candidate = sequelize.define('candidate', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        stream: DataTypes.STRING,
        role: DataTypes.STRING
    }, {
        timestamps: true,
        tableName: 'candidates',
        classMethods: {
            associate: function (models) {
                // associations can be defined here
                const Candidate = models.Candidate;
                const DrivesCandidate = models.DrivesCandidate;
                const Drive = models.Drive;

                Candidate.hasMany(DrivesCandidate, {
                    as: 'DrivesCandidatesFk1s',
                    foreignKey: 'candidate_id',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });

                Candidate.belongsToMany(Drive, {
                    as: 'DrivesCandidateDrives',
                    through: DrivesCandidate,
                    foreignKey: 'candidate_id',
                    otherKey: 'drive_id',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });
            }
        }
    });
    return candidate;
};