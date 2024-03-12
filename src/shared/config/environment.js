const environment = {
  app: {
    name: ''
  },
  server: {
    port: 3333,
    maxRequestBodySize: '100mb'
  },
  logging: {
    level: 'debug',
    file: ''
  },
  kafka: {
    brokers: []
  },
  rabbitmq: {
    url: ''
  },

  DB_HOST: 'localhost',
  DB_PORT: 0,
  DB_USERNAME: '',
  DB_PASSWORD: '',
  DB_DATABASE: '',
  REJECT_UNAUTHORIZED: false,
  MIDDLELAYER_URL: '',
  FRONTEND_URL: '',
  LEGACY_BACKEND_URL: '',
  PERSHING_USER_ID: '' // pershing user id

}

export default environment
