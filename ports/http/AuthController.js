const jwt = require('jsonwebtoken')

const AuthController = (container) => ({
  callback: async (req, res) => {
    const { Auth, Logger } = container

    const auth = await Auth(req.headers.cookie)
    Logger.debug({ ...auth, name: 'Login' })

    const identity = {
      id: auth.identity.id,
      ...auth.identity.traits
    }
    const token = jwt.sign(identity, process.env.JWT_SECRET)
    Logger.debug(token)

    res.redirect(`${process.env.DIARY_URL}/auth/callback?login=${token}`)
  }
})

module.exports = AuthController
