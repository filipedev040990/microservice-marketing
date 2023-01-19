import { RabbitmqAdapter } from './rabbitmq.adapter'

const makeSut = (): RabbitmqAdapter => {
  return new RabbitmqAdapter('amqp://admin:admin@172.20.0.2:5672')
}

describe('RabbitmqAdapter', () => {
  test.skip('should publish an message', async () => {
    const sut = makeSut()
    const message = {
      action: 'confirmed_payment',
      client: 'filipe@hotmail.com.br'
    }

    await sut.start()
    const publish = await sut.publish('amq.direct', 'confirmed_payment', JSON.stringify(message))

    expect(publish).toBeTruthy()
  })
})
