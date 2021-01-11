function NotFoundError (description) {
  Error.call(this)
  Error.captureStackTrace(this)
  this.name = 'NOT_FOUND'
  this.statusCode = 404
  this.message = description
  this.isOperational = true
}
NotFoundError.prototype = Object.create(Error.prototype)
NotFoundError.prototype.constructor = NotFoundError

function InvalidData (description) {
  Error.call(this)
  Error.captureStackTrace(this)
  this.name = 'INVALID_DATA'
  this.statusCode = 422
  this.message = description
  this.isOperational = true
}
InvalidData.prototype = Object.create(Error.prototype)
InvalidData.prototype.constructor = InvalidData

module.exports = {
  NotFoundError,
  InvalidData
}
