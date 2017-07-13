var express = require('express');
var router = express.Router();
var models = require('../models');
var Q = require('q');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/**
 * Create candidate only
 */
router.post('/create', function (req, res, next) {
    res.send('respond with a resource');
});

/**
 * Create candidate, drive and test objects with all details
 */
router.post('/create-with-drive', function (req, res, next) {
    console.log(req.body);
    console.log(req.params);
    // console.log(req);

    var candidate = req.body.candidate;
    var drive = req.body.drive;
    var drivesCandidate = req.body.drivesCandidate;
    var hiringStatus = req.body.hiringStatus;
    var tests = req.body.tests;

    console.log('candidate', candidate);
    console.log('drive', drive);
    console.log('hiringStatus', hiringStatus);
    console.log('tests', tests);
    console.log('\n\n===========\n\n');

    function failure(error) {
        console.log('error', error);
        res.send('Thanks. I got the request with params. with error ');
    }

    /**
     * TODO : Handle db transaction here and implement it using async library
     */
    findOrCreateCandidate(candidate).then(
        function success(candidate) {
            addCandidateToDrive(drive, candidate)
                .then(function success(drivesCandidateObj) {
                    addCandidateTests(tests, drivesCandidateObj)
                        .then(function success(tests) {
                            var userObj = {id: 1}; // for time being pushing hard coaded value. There is seeder to create the user.
                            addHiringStatus(hiringStatus, drivesCandidateObj, userObj)
                                .then(function success(hiringStatusObj) {
                                    console.log('=== done hiring status insert');
                                    res.send(hiringStatusObj); // , hiringStatusObj
                                }, failure);
                        }, failure);

                }, failure);
        }, failure);
});

/**
 * Get details of candidate with all drives and tests
 */
router.get('/edit-with-drive', function (req, res, next) {
    res.send('respond with a resource');
});

/**
 * Update candidate, drive and test details
 *
 * Note : it could be post/put. need to check with UI calls
 */
router.post('/edit-with-drive', function (req, res, next) {
    res.send('respond with a resource');
});

function addHiringStatus(hiringStatus, drivesCandidateObj, userObj) {
    var drivesCandidateId = drivesCandidateObj.id;
    var deferred = Q.defer();

    models.hiringStatus.findOne({
        where: {
            drivesCandidateId: drivesCandidateId
        }
    }).then(
        function success(hiringStatusObj) {
            if (hiringStatusObj) {
                hiringStatusObj.status = hiringStatus.status;
                hiringStatusObj.comment = hiringStatus.comment;
                hiringStatusObj.userId = userObj.id;

                hiringStatusObj.save()
                    .then(function success(hiringStatusObj) {
                        deferred.resolve(hiringStatusObj);
                    }, function failure(error) {
                        deferred.reject(error);
                    });
            } else {
                models.hiringStatus.build({
                    status: hiringStatus.status,
                    comment: hiringStatus.comment,
                    userId: userObj.id,
                    drivesCandidateId: drivesCandidateId
                }).save()
                    .then(function success(hiringStatusObj) {
                        deferred.resolve(hiringStatusObj);
                    }, function failure(error) {
                        console.log('in hiring status error =>', error);
                        deferred.reject(error);
                    });
            }
        }, function failure(error) {
            console.log('in hiring status error =>', error);
            deferred.reject(error);
        });
    return deferred.promise;
}

function addCandidateTests(tests, drivesCandidateObj) {
    var deferred = Q.defer();

    if (tests.length > 0) {

        var testPromises = []; // store all promises for test

        tests.forEach(function (test, key) {
            var testDeferred = Q.defer();

            createUpdateTest(test, drivesCandidateObj, testDeferred);
            testPromises.push(testDeferred.promise);
        });

        Q.all(testPromises).then(function (allTests) {
            deferred.resolve(allTests);
        });
    } else {
        deferred.resolve(tests);
    }

    return deferred.promise;
}

function createUpdateTest(test, drivesCandidateObj, testDeferred) {
    var drivesCandidateId = drivesCandidateObj.id;

    // Add test one by one
    models.candidatesTestResult.findOne({
        where: {
            testTypeId: test.testTypeId,
            drivesCandidateId: drivesCandidateId
        }
    }).then(
        function success(candidateTestResultObj) {
            if (candidateTestResultObj) {
                candidateTestResultObj.score = test.score;
                candidateTestResultObj.status = test.status;
                candidateTestResultObj.participated = test.participated;

                candidateTestResultObj.save()
                    .then(function success(candidateTestResultObj) {
                        testDeferred.resolve(candidateTestResultObj);
                    }, function failure(error) {
                        console.log('candidateTestResultObj not saved =>', error);
                        testDeferred.reject(error);
                    });
            } else {
                models.candidatesTestResult
                    .build({
                        score: test.score,
                        status: test.status,
                        participated: test.participated,
                        testTypeId: test.testTypeId,
                        drivesCandidateId: drivesCandidateId
                    })
                    .save()
                    .then(function success(candidateTestResultObj) {
                        testDeferred.resolve(candidateTestResultObj);
                    }, function failure(error) {
                        console.log('candidateTestResultObj not saved =>', error);
                        testDeferred.reject(error);
                    });
            }
        }, function failure(error) {
            console.log('candidateTestResultObj not saved =>', candidateTestResultObj, error);
            testDeferred.reject(error);
        });
}


function addCandidateToDrive(drive, candidate) {
    var deferred = Q.defer();

    // drivesCandidate
    models.drivesCandidate.findOne({
        where: {
            driveId: drive.id,
            candidateId: candidate.id
        }
    }).then(function success(drivesCandidateObj) {
        if (drivesCandidateObj) {
            drivesCandidateObj.participated = drive.participated;
            drivesCandidateObj.save()
                .then(function success(drivesCandidateObj) {
                    deferred.resolve(drivesCandidateObj);
                }, function failure(error) {
                    console.log('drivesCandidateObj not saved =>');
                    deferred.reject(error);
                });
        } else {
            models.drivesCandidate
                .build({
                    participated: drive.participated,
                    driveId: drive.id,
                    candidateId: candidate.id
                })
                .save()
                .then(function success(drivesCandidateObj) {
                    deferred.resolve(drivesCandidateObj);
                }, function failure(error) {
                    console.log('drivesCandidateObj not saved =>');
                    deferred.reject(error);
                });
        }
    }, function failure(error) {
        console.log('drivesCandidateObj not found =>', drive, candidate);
        deferred.reject(error);
    });

    return deferred.promise;
}

function findOrCreateCandidate(candidate) {
    var deferred = Q.defer();

    // Find candidate by its id or email
    models.candidate.findOne({
        where: {
            $or: [
                {id: candidate.id},
                {email: candidate.email}
            ]
        }
    }).then(
        function success(candidateObj) {
            if (candidateObj) {
                deferred.resolve(candidateObj);
            } else {
                // candidate = req.body.candidate;

                //Candidate not found
                models.candidate.build({
                    firstname: candidate.firstname,
                    lastname: candidate.lastname,
                    email: candidate.email,
                    phone: candidate.phone,
                    stream: candidate.stream,
                    role: candidate.role
                })
                    .save()
                    .then(function success(candidate) {
                        deferred.resolve(candidate);
                    }, function failure(error) {
                        console.log('findOrCreateCandidate not found =>', error);
                        deferred.reject(error)
                    });
            }
        },
        function failure(error) {
            deferred.reject(error);
        }
    );

    return deferred.promise;
}

function createCandidate() {

}

function getDrive() {

}

module.exports = router;
