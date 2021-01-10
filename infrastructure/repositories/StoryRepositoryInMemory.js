module.exports = () => ({
  lastId: 0,
  db: [],

  persist(story) {
    story.id = `${++this.lastId}`
    this.db.push(story)
    return story
  }
})
