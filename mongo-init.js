/* eslint-disable no-undef */
db.createUser({
  user: 'myuser',
  pwd: 'mypass',
  roles: [
    {
      role: 'readWrite',
      db: 'core'
    }
  ]
})
