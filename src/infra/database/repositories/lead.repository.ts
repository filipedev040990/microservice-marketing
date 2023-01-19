import { GetLeadByEmailRepositoryInterface } from '@/domain/repositories/get-lead-by-email.repository.interface'
import { InputLead, SaveLeadRepositoryInterface } from '@/domain/repositories/save-lead.repository.interface'
import { UpdateLeadRepositoryInterface } from '@/domain/repositories/update-lead.repository.interface'
import { MongoHelper } from '../helpers/mongo.helper'

export class LeadRepository implements SaveLeadRepositoryInterface, GetLeadByEmailRepositoryInterface, UpdateLeadRepositoryInterface {
  async save (input: InputLead): Promise<void> {
    const leadCollection = await MongoHelper.getCollection('leads')
    await leadCollection.insertOne(input)
  }

  async getByEmail (email: string): Promise<any> {
    const leadCollection = await MongoHelper.getCollection('leads')
    const lead = await leadCollection.findOne({ email })
    return lead || null
  }

  async update (email: string, status: string): Promise<void> {
    const leadCollection = await MongoHelper.getCollection('leads')
    await leadCollection.updateOne({
      email
    }, {
      $set: {
        status,
        updated_at: new Date()
      }
    })
  }
}
