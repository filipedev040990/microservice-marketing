import { UpdateLeadUseCase } from '@/application/usecases/update-lead/update-lead.usecase'
import constants from '@/shared/constants'
import { RabbitmqAdapter } from '../adapters/rabbitmq.adapter'
import config from '../config'
import { LeadRepository } from '../database/repositories/lead.repository'

export const ConsumeQueueConfirmedPayment = async (): Promise<void> => {
  const server = new RabbitmqAdapter(config.rabbitmq.uri)
  await server.start()
  await server.consume('payment_confirmed', async (message: any) => {
    const msg = JSON.parse(message.content.toString())
    const leadRepository = new LeadRepository()
    const updateLeadUseCase = new UpdateLeadUseCase(leadRepository)
    await updateLeadUseCase.execute(msg.client, constants.LEAD_STATUS_CUSTOMER)
  })
}
