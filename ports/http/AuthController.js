const kratos = require('@ory/kratos-client')

const AuthController = (container) => ({
  callback: async (req, res) => {
    const { Auth, Logger } = container

    const auth = await Auth(req.headers.cookie)

    Logger.debug({ ...auth, name: 'Login' })
    res.send(auth)
  }
})

module.exports = AuthController
