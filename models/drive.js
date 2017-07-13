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
        underscored: true,
        tableName: 'drives'
        /*,
        classMethods: {
            associate: function (models) {
                const Drive = models.drive;
                const DrivesCandidate = models.drivesCandidate;
                const Candidate = models.candidate;

                Drive.hasMany(DrivesCandidate, {
                    as: 'CandidatesFk0s',
                    foreignKey: 'drive_id',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });

                Drive.hasMany(Candidate, {
                    // as: 'CandidatesFk0s',
                    through: DrivesCandidate,
                    foreignKey: 'drive_id',
                    otherKey: 'candidate_id',
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                });

                // Drive.belongsToMany(Candidate, {
                //     as: 'DrivesCandidateCandidates',
                //     through: DrivesCandidate,
                //     foreignKey: 'drive_id',
                //     otherKey: 'candidate_id',
                //     onDelete: 'cascade',
                //     onUpdate: 'cascade'
                // });
            }
        }*/
    });

    drive.associate = function(models) {

        drive.belongsToMany(models.candidate, {
            through: models.drivesCandidate,
            foreignKey: 'drive_id',
            otherKey: 'candidate_id',
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        // drive.belongsToMany(models.drive, {
        //     as: 'DrivesCandidateDrives',
        //     through: models.drivesCandidate,
        //     foreignKey: 'candidate_id',
        //     otherKey: 'drive_id',
        //     onDelete: 'cascade',
        //     onUpdate: 'cascade'
        // });
    };
    return drive;
};