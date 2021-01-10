const chai = require('chai')
const chaiHttp = require('chai-http')
const { DateTime } = require('luxon')
const time = require('timekeeper')

chai.use(chaiHttp)
const expect = chai.expect

describe('Stories API', async () => {
  describe('2xx', () => {
    describe('When a summary is inserted with date', () => {
      it('POST /stories stores with given date', async () => {
        const story = {
          date: '2020-01-01',
          summary: 'I created an API in NodeJS',
          repo: 'rasouza/diary',
          user: 'objectId1234',
          description: 'Lorem Ipsum Dolor Sit Amet'
        }

        await chai.request('http://localhost:3000')
          .post('/stories')
          .send(story)
          .then(res => {
            expect(res).to.have.status(201)
            expect(res).to.be.json
            expect(res.body).to.eql({
              id: '1',
              date: `${DateTime.fromISO('2020-01-01').toUTC()}`,
              summary: 'I created an API in NodeJS',
              repo: 'rasouza/diary',
              user: 'objectId1234',
              description: 'Lorem Ipsum Dolor Sit Amet'
            })
          })
      })
    })

    describe('When a summary is inserted WITHOUT date', () => {
      beforeEach(() => time.freeze())
      afterEach(() => time.reset())

      it('POST /stories stores with current date', async () => {
        const story = {
          summary: 'I created an API in NodeJS',
          repo: 'rasouza/diary',
          user: 'objectId1234'
        }

        await chai.request('http://localhost:3000')
          .post('/stories')
          .send(story)
          .then(res => {
            expect(res).to.have.status(201)
            expect(res).to.be.json
            expect(res.body).to.eql({
              id: '2',
              date: `${DateTime.utc()}`,
              summary: 'I created an API in NodeJS',
              repo: 'rasouza/diary',
              user: 'objectId1234'
            })
          })
      })
    })
  })

  describe('4xx', () => {
    describe('When INVALID payload is given and', () => {
      it('there is no summary', async () => {
        const story = {
          repo: 'rasouza/diary'
        }

        await chai.request('http://localhost:3000')
          .post('/stories')
          .send(story)
          .catch(res => {
            expect(res).to.have.status(400)
            expect(res.body).to.contain({
              message: "body should have required property 'summary'"
            })
          })
      })
      it('there is no user', async () => {
        const story = {
          summary: 'I created an API in NodeJS',
          repo: 'rasouza/diary'
        }

        await chai.request('http://localhost:3000')
          .post('/stories')
          .send(story)
          .catch(res => {
            expect(res).to.have.status(400)
            expect(res.body).to.contain({
              message: "body should have required property 'user'"
            })
          })
      })

      it("can't parse date", async () => {
        const story = {
          date: 'wrong-date-format',
          summary: 'I created an API in NodeJS',
          repo: 'rasouza/diary',
          user: 'objectId1234'
        }

        await chai.request('http://localhost:3000')
          .post('/stories')
          .send(story)
          .catch(res => {
            expect(res).to.have.status(400)
            expect(res.body).to.contain({
              message: 'body.date should match format "date"'
            })
          })
      })
    })
    describe.skip('When NO USER is found in database', () => {
      it('returns 404', async () => {
        const story = {
          date: 'wrong-date-format',
          summary: 'I created an API in NodeJS',
          repo: 'rasouza/diary',
          user: 'objectId1234'
        }
        await chai.request('http://localhost:3000')
          .post('/stories')
          .send(story)
          .catch(res => {
            expect(res).to.have.status(404)
            expect(res.body).to.contain({
              message: 'User not found'
            })
          })
      })
    })
  })
})
