const { asFunction } = require('awilix')

const inMemoryDB = container => {
  const StoryRepositoryInMemory = require('../repositories/StoryRepositoryInMemory')

  container.register({
    StoryRepository: asFunction(StoryRepositoryInMemory).singleton()
  })
}

const mongoDB = container => {
  const StoryRepositoryMongo = require('../repositories/StoryRepositoryMongo')

  // Load Database and Schemas
  container.loadModules([
    'infrastructure/database/**/*.js'
  ])

  container.register({
    StoryRepository: asFunction(StoryRepositoryMongo)
  })
}

const resolveDB = container => {
  if (process.env.NODE_ENV === 'test') process.env.DB_DRIVER = 'in-memory'

  if (process.env.DB_DRIVER === 'in-memory') inMemoryDB(container)
  else if (process.env.DB_DRIVER === 'mongo') mongoDB(container)
}

module.exports = resolveDB
