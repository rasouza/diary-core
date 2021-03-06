const { asValue } = require('awilix')

const resolveLogger = container => {
  const isDev = process.env.NODE_ENV === 'development'
  const config = {
    name: 'diary-core',
    prettyPrint: isDev,
    level: process.env.LOG_LEVEL || 'info'
  }

  const Logger = require('pino')(config)

  container.register({
    Logger: asValue(Logger)
  })

  container.register({
    FastifyLogger: asValue(config)
  })
}

module.exports = resolveLogger
