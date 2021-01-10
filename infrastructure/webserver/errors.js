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

module.exports = {
  NotFoundError
}
