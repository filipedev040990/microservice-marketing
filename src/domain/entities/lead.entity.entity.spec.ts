import constants from '@/shared/constants'
import { Lead } from './lead.entity'
import MockDate from 'mockdate'

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
    expect(lead.name).toBe('Any Name')
    expect(lead.email).toBe('anyEmail@email.com')
    expect(lead.status).toBe(constants.LEAD_STATUS_INTERESTED)
    expect(lead.created_at).toEqual(new Date())
  })
})
