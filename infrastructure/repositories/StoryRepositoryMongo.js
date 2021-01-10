module.exports = ({ Story, StorySchema, Logger }) => ({
  persist: async story => {
    const { date, summary, description, link, repo, user } = story
    const dbStory = new StorySchema({
      date,
      summary,
      description,
      link,
      repo,
      user
    })

    await dbStory.save()
    Logger.debug(`Saving ${dbStory} to database`)
    story.id = dbStory.id
    return story
  }
})
