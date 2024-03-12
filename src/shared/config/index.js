import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
import configServer from 'nice-cloud-config-client'

import environment from './environment.js'
import { configureEnvironmentConfigServer } from './configureEnvironment.js'
import { createLogger } from '@shared/logging/index.js'

export default class Config {
  #env
  #logger

  constructor(env = process.env.NODE_ENV) {
    this.#env = env || 'Local'
    this.#logger = createLogger(environment)
  }

  async bootstrap() {
    this.#logger.info(`Starting configuration for env: ${this.#env}`)

    const strategies = new Map()
    strategies.set('local', this.#loadEnvFromFile.bind(this))
    strategies.set('development', this.#loadFromConfigServer.bind(this))
    strategies.set('staging', this.#loadFromConfigServer.bind(this))
    strategies.set('production', this.#loadFromConfigServer.bind(this))

    const strategyForEnvironment = strategies.get(this.#env.toLocaleLowerCase())
    const environmentWithValues = await strategyForEnvironment()

    Object.freeze(environmentWithValues)

    // Create a new logger using the final configuration
    this.#logger = createLogger(environmentWithValues)

    return environmentWithValues
  }

  logger() {
    return this.#logger
  }

  async #loadEnvFromFile() {
    const envFile = '.env'
    const envPath = path.resolve(path.dirname(''), envFile)

    this.#logger.info(`Loading env using file ${envPath}`)

    if (fs.existsSync(envPath)) {
      dotenv.config({ path: envPath })
    }

    environment.app.name = process.env.APP_NAME
    environment.server.port = process.env.SERVER_PORT
    environment.server.maxRequestBodySize =
      process.env.SERVER_MAX_REQUEST_BODY_SIZE
    environment.logging.level = process.env.LOGGING_LEVEL
    environment.logging.file = process.env.LOGGING_FILE
    environment.kafka.brokers = process.env.KAFKA_BROKERS?.split(',')
    environment.rabbitmq.url = process.env.RABBITMQ_URL

    environment.rabbitmq.url = process.env.RABBITMQ_URL

    environment.DB_DATABASE = process.env.DB_DATABASE
    environment.DB_HOST = process.env.DB_HOST
    environment.DB_PASSWORD = process.env.DB_PASSWORD
    environment.DB_PORT = process.env.DB_PORT
    environment.DB_USERNAME = process.env.DB_USERNAME
    environment.REJECT_UNAUTHORIZED = process.env.REJECT_UNAUTHORIZED

    environment.REJECT_UNAUTHORIZED = process.env.REJECT_UNAUTHORIZED

    environment.MIDDLELAYER_URL = process.env.MIDDLELAYER_URL
    environment.FRONTEND_URL = process.env.FRONTEND_URL
    environment.LEGACY_BACKEND_URL = process.env.LEGACY_BACKEND_URL
    environment.PERSHING_USER_ID = process.env.PERSHING_USER_ID // pershing user id

    return environment
  }

  async #loadFromConfigServer() {
    const configServerAppName = process.env.CONFIG_SERVER_APP_NAME
    const configServerUrl = process.env.CONFIG_SERVER_URL
    const configServerUser = process.env.CONFIG_SERVER_USER
    const configServerPassword = process.env.CONFIG_SERVER_PASSWORD

    console.table({
      configServerAppName: process.env.CONFIG_SERVER_APP_NAME,
      configServerUrl: process.env.CONFIG_SERVER_URL,
      configServerUser: process.env.CONFIG_SERVER_USER,
      configServerPassword: process.env.CONFIG_SERVER_PASSWORD
    })

    if (!configServerAppName) {
      throw new Error('Application name must be provided')
    }

    if (!configServerUrl) {
      throw new Error('Config server url must be provided')
    }

    if (!configServerUser) {
      throw new Error('Config server user must be provided')
    }

    if (!configServerPassword) {
      throw new Error('Config server password must be provided')
    }

    this.#logger.info(`Loading env using config server ${configServerUrl}`)

    const configuration = await configServer.load({
      rejectUnauthorized: false,
      name: configServerAppName,
      endpoint: configServerUrl,
      profiles: this.#env,
      auth: {
        user: configServerUser,
        pass: configServerPassword
      }
    })

    if (configuration instanceof Error) {
      throw configuration
    }

    return configureEnvironmentConfigServer(
      environment,
      configuration.properties,
      '.',
      configuration
    )
  }
}
