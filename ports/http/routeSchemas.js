/* eslint-disable no-useless-escape */

const schemas = () => ([
  {
    $id: 'StorySchema',
    type: 'object',
    definitions: {
      body: {
        required: ['summary', 'user'],
        properties: {
          id: { type: 'string' },
          date: {
            type: 'string',
            format: 'date'
          },
          summary: { type: 'string' },
          description: { type: 'string' },
          repo: {
            type: 'string',
            pattern: '^([\w\.@\:/\-~]+)$'
          },
          link: {
            type: 'string',
            format: 'url'
          },
          user: { type: 'string' }
        }
      },
      response: {
        '2xx': { $ref: '#/definitions/body' }
      }
    }
  }
])

module.exports = schemas
