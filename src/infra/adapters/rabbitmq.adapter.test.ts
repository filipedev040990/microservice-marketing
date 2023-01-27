import { RabbitmqAdapter } from './rabbitmq.adapter'

const makeSut = (): RabbitmqAdapter => {
  return new RabbitmqAdapter('amqp://admin:admin@172.22.0.2:5672')
}

describe('RabbitmqAdapter', () => {
  test.skip('should publish an message', async () => {
    const sut = makeSut()
    const message = {
      action: 'payment_processed',
      client: 'joao@hotmail.com.br',
      status: 'confirmed'
    }

    await sut.start()
    const publish = await sut.publish('amq.direct', 'payments_processed', JSON.stringify(message))

    expect(publish).toBeTruthy()
  })
})
