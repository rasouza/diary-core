/* eslint-disable no-useless-escape */

const schemas = () => ([{
  $id: 'StorySchema',
  type: 'object',
  required: ['summary'],
  properties: {
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
}])

module.exports = schemas
