import { MongoHelper } from '../helpers/mongo.helper'
import { LeadRepository } from './lead.repository'
import MockDate from 'mockdate'
import { HttpRequest } from '@/shared/types/http.type'
import crypto from 'crypto'

const makeSut = (): LeadRepository => {
  return new LeadRepository()
}

const makeLeadInputMock = (): HttpRequest => ({
  body: {
    id: crypto.randomUUID(),
    name: 'Any Name',
    email: 'anyEmail@email.com',
    status: 'INTERESTED',
    created_at: new Date()
  }
})

let leadCollection

describe('LeadRepository', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    MockDate.reset()
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    leadCollection = await MongoHelper.getCollection('leads')
    await leadCollection.deleteMany({})
  })

  test('should save a lead', async () => {
    const sut = makeSut()
    const input = makeLeadInputMock()

    await sut.save(input.body)

    const lead = await leadCollection.findOne({ email: input.body.email })

    expect(lead).toBeTruthy()
    expect(lead).toHaveProperty('id')
    expect(lead.name).toBe(input.body.name)
    expect(lead.email).toBe(input.body.email)
    expect(lead.status).toBe('INTERESTED')
    expect(lead.created_at).toEqual(new Date())
  })
})