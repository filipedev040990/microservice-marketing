import 'module-alias/register'
import { app } from './app'
import { MongoHelper } from './database/helpers/mongo.helper'
import config from './config'
import { ConsumeQueueConfirmedPayment } from './queue/consume-queue-confirmed_payment'

const start = async (): Promise<void> => {
  try {
    await ConsumeQueueConfirmedPayment()
    await MongoHelper.connect(config.mongodb.mongoUrl)
    const port = config.server.port || 3000
    app.listen(port, () => console.log(`Server running at ${port}`))
    await ConsumeQueueConfirmedPayment()
  } catch (error) {
    console.log(error)
  }
}

void start()
