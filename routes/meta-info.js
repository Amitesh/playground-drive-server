var _ = require('lodash');
var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET meta info listing. */
router.get('/', function(req, res, next) {
    models.metaInfo.findAll({limit: 1}).then(function(metaInfo) {
        res.json(formatMeta(metaInfo));
    });
});

function formatMeta(meta){
  var formatedMeta = {};
  if(meta.length > 0){
      var info = meta[0];
      console.log(info);
      formatedMeta.streams = _.split(info.streams, ',');
      formatedMeta.roles = _.split(info.roles, ',');
      formatedMeta.participated = _.split(info.participated, ',');
      formatedMeta.status = _.split(info.status, ',');
      formatedMeta.hiringStatus = _.split(info.hiringStatus, ',');
  }
  return formatedMeta;
}
module.exports = router;