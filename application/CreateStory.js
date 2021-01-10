
const { DateTime } = require('luxon')

module.exports = ({ StoryRepository, Story, Errors }) => (date, summary, description, link, repo, user) => {
  try {
    date = date ? DateTime.fromISO(date) : DateTime.local()
  } catch (error) {
    throw new Errors.InvalidData(error.message)
  }

  const story = new Story(null, date.toUTC(), summary, description, link, repo, user)

  return StoryRepository.persist(story)
}
