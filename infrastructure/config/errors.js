const { asValue } = require('awilix')
const Errors = require('../webserver/errors')

const resolveErrors = container => {
  container.register({ Errors: asValue(Errors) })
}

module.exports = resolveErrors
