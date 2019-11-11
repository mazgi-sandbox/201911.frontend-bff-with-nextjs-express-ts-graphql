import {
  MiddlewareFn,
  MiddlewareInterface,
  NextFn,
  ResolverData
} from 'type-graphql'
import { Context } from './Context'
import User from 'entities/User'
import { generateToken } from 'lib/jwt'
import { saveTokenToResponseCookie } from './saveTokenToResponseCookie'

// https://typegraphql.ml/docs/middlewares.html#class-based-middleware
export class SignInResultMiddleware implements MiddlewareInterface<Context> {
  async use(
    { context, info }: ResolverData<Context>,
    next: NextFn
  ): Promise<MiddlewareFn<Context>> {
    const result = await next()
    if (info.path.key === 'signIn' && info.returnType.toString() === 'User') {
      const user = result as User
      const newToken = await generateToken(user)
      saveTokenToResponseCookie(context.response, newToken)
    }
    return result
  }
}

export default SignInResultMiddleware
