/* eslint-disable no-useless-escape */

const schemas = () => ([{
  $id: 'StorySchema',
  type: 'object',
  required: ['summary'],
  properties: {
    date: {
      type: 'string'
      // format: 'date'
    },
    summary: { type: 'string' },
    description: { type: 'string' },
    repo: {
      type: 'string',
      pattern: '^([\w\.@\:/\-~]+)$'
    },
    link: {
      type: 'string',
      pattern: '[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)'
    },
    user: { type: 'string' }
  }
}])

module.exports = schemas
