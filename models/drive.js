'use strict';
module.exports = function (sequelize, DataTypes) {
    var drive = sequelize.define('drive', {
        id: {
            type: DataTypes.INTEGER,
            field: 'id',
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        scheduledOn: {
            type: DataTypes.DATE,
            field: 'scheduled_on',
            allowNull: false
        },
        name: DataTypes.STRING
    }, {
        timestamps: true,
        tableName: 'drives',
        classMethods: {
            associate: function (models) {
                const Drive = models.Drive
                const DrivesCandidate = models.DrivesCandidate
                const Candidate = models.Candidate

                Drive.hasMany(DrivesCandidate, {
                    as: 'CandidatesFk0s',
                    foreignKey: 'drive_id',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                })

                Drive.belongsToMany(Candidate, {
                    as: 'DrivesCandidateCandidates',
                    through: DrivesCandidate,
                    foreignKey: 'drive_id',
                    otherKey: 'candidate_id',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                })
            }
        }
    });
    return drive;
};