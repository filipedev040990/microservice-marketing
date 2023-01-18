import { InputLead, SaveLeadRepositoryInterface } from '@/domain/repositories/save-lead.repository.interface'
import { MongoHelper } from '../helpers/mongo.helper'

export class LeadRepository implements SaveLeadRepositoryInterface {
  async save (input: InputLead): Promise<void> {
    const leadCollection = await MongoHelper.getCollection('leads')
    await leadCollection.insertOne(input)
  }
}
