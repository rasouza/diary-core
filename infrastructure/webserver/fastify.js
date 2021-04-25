const each = require('lodash/fp/each')
const fastify = require('fastify')
const fastifyStatic = require('fastify-static')
const fastifyPrettier = require('fastify-prettier')
const helmet = require('fastify-helmet')
const path = require('path')

const setupSchemas = server => each(schema => server.addSchema(schema))
const setupRoutes = server => each(path => server.route(path))

const setupStatic = server => {
  server.register(fastifyStatic, {
    root: path.join(__dirname, '../..'),
    redirect: true
  })
  server.register(
    fastifyPrettier,
    {
      fallbackOnError: true
    }
  )
  server.get('/docs/', (req, res) => { res.sendFile('docs/') })
  server.get('/coverage/', (req, res) => { res.sendFile('coverage/') })
}

// TODO: Create OpenAPI from Fastify

module.exports = ({ routes, routeSchemas, FastifyLogger }) => {
  const server = fastify({
    logger: FastifyLogger
  })

  server.register(helmet)

  setupSchemas(server)(routeSchemas)
  setupRoutes(server)(routes)
  setupStatic(server)

  return server
}
