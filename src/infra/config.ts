export default {
  mongodb: {
    mongoUrl: process.env.ME_CONFIG_MONGODB_URL || 'mongodb://root:12345678@mongo:27017/micro-marketing?authSource=admin'
  },
  server: {
    port: 3000
  }
}
