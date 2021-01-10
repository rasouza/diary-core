const { Schema } = require('mongoose')

const storySchema = new Schema({
  date: Date,
  summary: String,
  description: String,
  link: String,
  repo: String,
  user: Schema.Types.ObjectId
})

const storyModel = ({ database: mongoose }) => mongoose.model('Story', storySchema)
module.exports = storyModel
