var express = require('express')
var router = express.Router()
var models = require('../models')
var _ = require('lodash')
var moment = require('moment');

var db = require('../models/index')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource')
})

/* GET users listing. */
router.get('/show', function (req, res, next) {

    db.sequelize.query('SELECT \
            "drive"."id" AS "drive_id", \
                "drive"."name" AS "drive_name", \
                "drive"."scheduled_on" AS "drive_scheduled_on", \
                "drives_candidate"."id" AS "drives_candidate_id", \
                "drives_candidate"."participated" AS "drives_candidate_participated", \
                "candidate"."id" AS "candidate_id", \
                "candidate"."firstname" AS "candidate_firstname", \
                "candidate"."lastname" AS "candidate_lastname", \
                "candidate"."email" AS "candidate_email", \
                "candidate"."phone" AS "candidate_phone", \
                "candidate"."stream" AS "candidate_stream", \
                "candidate"."role" AS "candidate_role", \
                "candidates_test_result"."id" AS "candidates_test_result_id", \
                "candidates_test_result"."participated" AS "candidates_test_result_participated", \
                "candidates_test_result"."score" AS "candidates_test_result_score", \
                "candidates_test_result"."status" AS "candidates_test_result_status", \
                "candidates_test_result"."test_type_id" AS "candidates_test_result_test_type_id", \
                "candidates_test_result"."drives_candidate_id" AS "candidates_test_result_drives_candidate_id", \
                "test_type"."id" AS "test_type_id", \
                "test_type"."name" AS "test_type_name", \
                "test_type"."order" AS "test_type_order", \
                "hiring_status"."id" AS "hiring_status_id", \
                "hiring_status"."status" AS "hiring_status_status", \
                "hiring_status"."comment" AS "hiring_status_comment", \
                "hiring_status"."user_id" AS "hiring_status_user_id" \
            FROM       "drives" AS "drive" \
            INNER JOIN "drives_candidates" AS "drives_candidate" \
                ON  "drive"."id" = "drives_candidate"."drive_id" \
            INNER JOIN "candidates" AS "candidate" \
                ON  "candidate"."id" = "drives_candidate"."candidate_id" \
            INNER JOIN "candidates_test_results" AS "candidates_test_result" \
                on "candidates_test_result"."drives_candidate_id" = "drives_candidate"."id" \
            INNER JOIN "test_types" AS "test_type" \
                on "candidates_test_result"."test_type_id" = "test_type"."id" \
            INNER JOIN "hiring_statuses" AS "hiring_status" \
                on "hiring_status"."drives_candidate_id" = "drives_candidate"."id" \
            ORDER BY "drive"."name"\
            ')
        .then(function success(results) {
                var data = formatData(results[0]);
                res.json(data);
            }, function failure(error) {
                console.log(error);
            }
        );

    function formatData(data) {
        var results = {};
        var t = null;

        // console.log(data);
        // console.log(JSON.stringify(data));
        _.forEach(data, function (row, k) {
            console.log(row);

            var o = results[row.drives_candidate_id] || {};

            if (!o.drive) {
                o.drive = {
                    id: row.drive_id,
                    name: row.drive_name,
                    scheduledOn: moment(row.drive_scheduled_on).format("Do MMMM, YYYY")
                };
            }

            if (!o.candidate) {
                o.candidate = {
                    id: row.candidate_id,
                    firstname: row.candidate_firstname,
                    lastname: row.candidate_lastname,
                    email: row.candidate_email,
                    phone: row.candidate_phone,
                    stream: row.candidate_stream,
                    role: row.candidate_role
                };
            }

            var testId = row.test_type_id;
            o.tests = o.tests || {};
            o.tests[testId] = {
                candidatesTestResultId: row.candidates_test_result_id,
                participated: row.candidates_test_result_participated ? 'yes' : 'no',
                score: row.candidates_test_result_score,
                status: row.candidates_test_result_status,
                name: row.test_type_name,
                order: row.test_type_order,
                testTypeId: row.test_type_id
            };

            if (!o.hiringStatus) {
                o.hiringStatus = {
                    id: row.hiring_status_id,
                    status: row.hiring_status_status,
                    comment: row.hiring_status_comment
                };
            }

            if (!o.drivesCandidate) {
                o.drivesCandidate = {
                    id: row.drives_candidate_id,
                    participated: row.drives_candidate_participated ? 'yes' : 'no'
                };
            }

            results[row.drives_candidate_id] = o;
        });

        return _.sortBy(results,
            function (o) {
                return o.drive.name
            }, function (o) {
                return o.candidate.firstname
            }).map(function(o){
                var tests = _.sortBy(o.tests, ['order']);
                o.tests = tests;
            return o;
        });
    }

})

module.exports = router
