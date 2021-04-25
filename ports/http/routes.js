module.exports = ({ StoriesController, AuthController }) => [
  {
    method: 'POST',
    path: '/stories',
    schema: {
      body: { $ref: 'StorySchema#/definitions/body' },
      response: {
        201: { $ref: 'StorySchema#/definitions/response/2xx' }
      }
    },
    handler: StoriesController.create
  },
  {
    method: 'GET',
    path: '/auth/callback',
    handler: AuthController.callback
  }
]
