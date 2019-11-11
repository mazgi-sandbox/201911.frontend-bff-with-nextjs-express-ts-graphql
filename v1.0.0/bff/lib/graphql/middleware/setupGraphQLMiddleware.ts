import { Request, Response } from 'express'
import { SignInResolver, UserResolver } from 'lib/graphql/resolver'
import Config from 'config'
import authChecker from 'lib/aaa/authChecker'
import { buildSchema } from 'type-graphql'
import graphqlHTTP from 'express-graphql'

export const setupGraphQLMiddleware = async (): Promise<graphqlHTTP.Middleware> => {
  const config = await Config.getConfig()
  const schema = await buildSchema({
    resolvers: [SignInResolver, UserResolver],
    authChecker
  })

  return graphqlHTTP((request: Request, response: Response) => {
    return {
      schema,
      context: { request, response, startTime: Date.now() },
      graphiql: config.isDevelopment,
      extensions: ({ context }): { [key: string]: unknown } => {
        return {
          runTime: Date.now() - context['startTime']
        }
      }
    }
  })
}
