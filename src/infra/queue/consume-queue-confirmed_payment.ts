import { UpdateLeadUseCase } from '@/application/usecases/update-lead/update-lead.usecase'
import constants from '@/shared/constants'
import config from '../config'
import { LeadRepository } from '../database/repositories/lead.repository'
import { RabbitmqAdapter } from './rabbitmq.adapter'

export const ConsumeQueueConfirmedPayment = async (): Promise<void> => {
  const server = new RabbitmqAdapter(config.rabbitmq.uri)
  await server.start()
  await server.consume('confirmed_payment', async (message: any) => {
    const msg = JSON.parse(message)
    const leadRepository = new LeadRepository()
    const updateLeadUseCase = new UpdateLeadUseCase(leadRepository)
    await updateLeadUseCase.execute(msg.email, constants.LEAD_STATUS_CUSTOMER)
  })
}
