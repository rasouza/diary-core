module.exports = ({ StoriesController }) => [
  {
    method: 'POST',
    path: '/stories',
    schema: {
      body: { $ref: 'StorySchema#' }
    },
    handler: StoriesController.create
  }
]
