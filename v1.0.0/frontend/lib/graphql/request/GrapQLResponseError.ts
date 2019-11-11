import { Query } from './Query'
import { gqlToString } from './gqlToString'

export class GrapQLResponseError extends Error {
  constructor(
    message: string,
    graphqlQuery: string | Query,
    graphqlErrors: Error[] = []
  ) {
    super()
    Object.defineProperty(this, 'name', {
      get: () => this.constructor.name
    })
    Object.defineProperty(this, 'message', {
      get: () => {
        const query = gqlToString(graphqlQuery)
        const errors = graphqlErrors.map(e => `\n${e.message}`)
        return `${message}\nquery: ${query}\n${errors}`
      }
    })
    Error.captureStackTrace(this, this.constructor)
  }
}
