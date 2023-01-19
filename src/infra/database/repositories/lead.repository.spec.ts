import { MongoHelper } from '../helpers/mongo.helper'
import { LeadRepository } from './lead.repository'
import MockDate from 'mockdate'
import { HttpRequest } from '@/shared/types/http.type'

const makeSut = (): LeadRepository => {
  return new LeadRepository()
}

const makeLeadInputMock = (): HttpRequest => ({
  body: {
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
    expect(lead).toHaveProperty('_id')
    expect(lead.name).toBe(input.body.name)
    expect(lead.email).toBe(input.body.email)
    expect(lead.status).toBe('INTERESTED')
    expect(lead.created_at).toEqual(new Date())
  })

  test('should get lead by email', async () => {
    const sut = makeSut()

    await leadCollection.insertOne({
      name: 'Any Name',
      email: 'anyEmail@email.com',
      status: 'INTERESTED',
      created_at: new Date()
    })

    const lead = await sut.getByEmail('anyEmail@email.com')

    expect(lead).toBeTruthy()
    expect(lead.email).toBe('anyEmail@email.com')
  })

  test('should update lead status to CUSTOMER', async () => {
    const sut = makeSut()

    await leadCollection.insertOne({
      name: 'Any Name',
      email: 'anyEmail@email.com',
      status: 'INTERESTED',
      created_at: new Date(),
      updated_at: new Date()
    })

    await sut.update('anyEmail@email.com', 'CUSTOMER')

    const lead = await sut.getByEmail('anyEmail@email.com')

    expect(lead).toBeTruthy()
    expect(lead.status).toBe('CUSTOMER')
  })
})
