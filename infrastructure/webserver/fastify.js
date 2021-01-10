const each = require('lodash/fp/each')
const fastify = require('fastify')
const fastifyStatic = require('fastify-static')
const path = require('path')
const Ajv = require('ajv')
const addFormats = require('ajv-formats')

module.exports = ({ routes, routeSchemas, FastifyLogger }) => {
  const server = fastify({
    logger: FastifyLogger
  })

  const ajv = new Ajv({
    removeAdditional: true,
    useDefaults: true,
    coerceTypes: true,
    nullable: true
  })
  addFormats(ajv)

  fastify.setValidatorCompiler(({ schema, method, url, httpPart }) => {
    return ajv.compile(schema)
  })

  /**
   * Setup route schemas
   */
  each(schema => {
    server.addSchema(schema)
  })(routeSchemas)

  /**
   * Setup routes
   */
  each(path => {
    server.route(path)
  })(routes)

  /**
   * Setup Docs and Coverage static file serving
   */
  server.register(fastifyStatic, {
    root: path.join(__dirname, '../..'),
    redirect: true
  })
  server.get('/docs/', (req, res) => { res.sendFile('docs/') })
  server.get('/coverage/', (req, res) => { res.sendFile('coverage/') })

  return server
}
