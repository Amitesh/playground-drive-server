var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/**
 * Create candidate only
 */
router.post('/create', function(req, res, next) {
    res.send('respond with a resource');
});

/**
 * Create candidate, drive and test objects with all details
 */
router.post('/create-with-drive', function(req, res, next) {
    var candidate = req.param('candidate');
    var drive = req.param('drive');
    var
    res.send('respond with a resource');
});

/**
 * Get details of candidate with all drives and tests
 */
router.get('/edit-with-drive', function(req, res, next) {
    res.send('respond with a resource');
});

/**
 * Update candidate, drive and test details
 *
 * Note : it could be post/put. need to check with UI calls
 */
router.post('/edit-with-drive', function(req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
