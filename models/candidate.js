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
        underscored: true,
        tableName: 'candidates'
        /*,
        classMethods: {
            associate: function (models) {
                // associations can be defined here
                const Candidate = models.candidate;
                const DrivesCandidate = models.drivesCandidate;
                const Drive = models.Drive;

                console.log('**********DrivesCandidate =>', DrivesCandidate);
                console.log('**********Drive =>', Drive);

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
        }*/
    });

    candidate.associate = function(models) {

        candidate.hasMany(models.drivesCandidate, {
            // as: 'DrivesCandidatesFk1s',
            foreignKey: 'candidate_id',
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        candidate.belongsToMany(models.drive, {
            // as: 'DrivesCandidateDrives',
            through: models.drivesCandidate,
            foreignKey: 'candidate_id',
            otherKey: 'drive_id',
            onDelete: 'cascade',
            onUpdate: 'cascade'
        });

        // candidate.belongsToMany(models.candidatesTestResult, {
        //     through: models.drivesCandidate,
        //     foreignKey: 'candidate_id',
        //     onDelete: 'cascade',
        //     onUpdate: 'cascade'
        // });
    };

    return candidate;
};