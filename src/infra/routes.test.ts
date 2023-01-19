import request from 'supertest'
import { MongoHelper } from './database/helpers/mongo.helper'
import { app } from './app'

let leadsCollection

describe('Leads routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })
  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  beforeEach(async () => {
    leadsCollection = await MongoHelper.getCollection('leads')
    await leadsCollection.deleteMany({})
  })

  test('should save an lead', async () => {
    await request(app)
      .post('/api/leads')
      .send({
        name: 'Zé das Couves',
        email: 'ze@gmail.com'
      })
      .expect(204)
  })
})
