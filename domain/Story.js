const { RESOLVER, asClass } = require('awilix')

class Story {
  constructor (id = null, date, summary, description, link, repo, user) {
    this.id = id
    this.date = date
    this.summary = summary
    this.description = description
    this.link = link
    this.repo = repo
    this.user = user
  }
}

module.exports = () => Story
Story[RESOLVER] = {
  register: asClass
}
