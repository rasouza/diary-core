const { Settings } = require('luxon')
const { createContainer } = require('awilix')
const resolveLogger = require('./logger')
const resolveDB = require('./database')
const resolveErrors = require('./errors')

const container = createContainer()

module.exports = () => {
  container.loadModules([
    'ports/**/*.js',
    'application/**/*.js',
    'domain/**/*.js'
  ])

  Settings.throwOnInvalid = true

  resolveDB(container)
  resolveLogger(container)
  resolveErrors(container)

  return container
}
