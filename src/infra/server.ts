import 'module-alias/register'
import { app } from './app'
import { MongoHelper } from './database/helpers/mongo.helper'
import config from './config'

const start = async (): Promise<void> => {
  try {
    await MongoHelper.connect(config.mongodb.mongoUrl)
    const port = config.server.port || 3000
    app.listen(port, () => console.log(`Server running at ${port}`))
  } catch (error) {
    console.log(error)
  }
}

void start()
