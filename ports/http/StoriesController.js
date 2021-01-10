const StoriesController = (container) => ({
  create: async (req, res) => {
    const { CreateStory } = container
    const { date, summary, description, link, repo, user } = req.body

    const story = await CreateStory(
      date,
      summary,
      description,
      link,
      repo,
      user
    )

    res.code(201).send(story)
  }
})

module.exports = StoriesController
