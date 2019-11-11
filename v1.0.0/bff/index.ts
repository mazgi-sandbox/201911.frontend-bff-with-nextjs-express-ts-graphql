import 'reflect-metadata'
import { BaseEntity, createConnection } from 'typeorm'
import Config from 'config'
import cookieParser from 'cookie-parser'
import { cookieTokenParser } from 'lib/graphql/middleware/cookieTokenParser'
import cors from 'cors'
import errorHandler from 'errorhandler'
import express from 'express'
import { loadDBSeeds } from 'db/seeds'
import logger from 'morgan'
import { setupGraphQLMiddleware } from 'lib/graphql/middleware'

async function start(): Promise<void> {
  const config = await Config.getConfig()

  const app = express()
  app.set('port', config.server.port)
  app.use(errorHandler())
  if (config.isDevelopment) {
    app.use(logger('dev'))
  }

  // CORS
  app.use(
    cors({
      origin: config.server.origins,
      credentials: !config.server.origins.includes('*')
    })
  )

  // Parse token
  app.use(cookieParser())
  app.use(cookieTokenParser)

  // ORM
  const connection = await createConnection(config.db)
  config.isDevelopment && (await connection.runMigrations())
  BaseEntity.useConnection(connection)
  await loadDBSeeds()

  // GraphQL
  app.use('/graphql', async (req, res) => {
    const middleWare = await setupGraphQLMiddleware()
    middleWare(req, res)
  })

  app.listen(app.get('port'), () => {
    console.log(
      `⚡ App is running at http://localhost:%d in %s mode`,
      app.get('port'),
      app.get('env')
    )
    console.log('  Press CTRL-C to stop\n')
  })
}
start()
