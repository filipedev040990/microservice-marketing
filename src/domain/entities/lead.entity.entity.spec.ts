import constants from '@/shared/constants'
import { Lead } from './lead.entity'

describe('Lead Entity', () => {
  test('should create an Lead correctly', () => {
    const sut = new Lead('Any Name', 'anyEmail@email.com')
    expect(sut).toBeTruthy()
    expect(sut.name).toBe('Any Name')
    expect(sut.email).toBe('anyEmail@email.com')
    expect(sut.status).toBe(constants.LEAD_STATUS_INTERESTED)
  })
})
