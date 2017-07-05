/* eslint global-require: "off" */
const model = {}
let initialized = false

/**
 * Initializes sequelize models and their relations.
 * @param   {Object} sequelize  - Sequelize instance.
 * @returns {Object}            - Sequelize models.
 */
function init (sequelize) {
  delete module.exports.init // Destroy itself to prevent repeated calls and clash with a model named 'init'.
  initialized = true
  // Import model files and assign them to `model` object.
  model.Candidate = sequelize.import('./definition/candidates.js')
  model.Drive = sequelize.import('./definition/drives.js')
  model.DrivesCandidate = sequelize.import('./definition/drives-candidates.js')
  model.HiringStatus = sequelize.import('./definition/hiring-status.js')
  model.MetaInfo = sequelize.import('./definition/meta-info.js')
  model.TestType = sequelize.import('./definition/test-types.js')
  model.UserTestResult = sequelize.import('./definition/user-test-results.js')
  model.User = sequelize.import('./definition/users.js')

  // All models are initialized. Now connect them with relations.
  require('./definition/candidates.js').initRelations()
  require('./definition/drives.js').initRelations()
  require('./definition/drives-candidates.js').initRelations()
  require('./definition/hiring-status.js').initRelations()
  require('./definition/meta-info.js').initRelations()
  require('./definition/test-types.js').initRelations()
  require('./definition/user-test-results.js').initRelations()
  require('./definition/users.js').initRelations()
  return model
}

// Note: While using this module, DO NOT FORGET FIRST CALL model.init(sequelize). Otherwise you get undefined.
module.exports = model
module.exports.init = init
module.exports.isInitialized = initialized
