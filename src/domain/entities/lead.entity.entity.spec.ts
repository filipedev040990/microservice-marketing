import constants from '@/shared/constants'
import { Lead } from './lead.entity'
import MockDate from 'mockdate'

jest.mock('crypto', () => ({
  randomUUID: jest.fn(() => '390d8ad3-185e-43c8-8c3f-48eaea7e46f5')
}))

describe('Lead Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should create an Lead correctly', () => {
    const lead = new Lead('Any Name', 'anyEmail@email.com')
    expect(lead).toBeTruthy()
    expect(lead.id).toBe('390d8ad3-185e-43c8-8c3f-48eaea7e46f5')
    expect(lead.name).toBe('Any Name')
    expect(lead.email).toBe('anyEmail@email.com')
    expect(lead.status).toBe(constants.LEAD_STATUS_INTERESTED)
    expect(lead.created_at).toEqual(new Date())
  })
})
