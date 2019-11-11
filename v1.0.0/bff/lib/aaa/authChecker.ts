import { generateToken, verifyToken } from 'lib/jwt'
import { AuthChecker } from 'type-graphql'
import Config from 'config'
import { Context } from './Context'
import User from 'entities/User'
import { getRepository } from 'typeorm'
import { saveTokenToResponseCookie } from './saveTokenToResponseCookie'

type RoleDefinition = {
  requiredRoles: string[]
  targetResource: string
}[]

const authChecker: AuthChecker<Context, RoleDefinition> = async (
  { context: { request, response } },
  roles
) => {
  const config = await Config.getConfig()
  const repository = getRepository(User)
  let token = request.cookies.token
  config.isDevelopment && console.log(`roles: `, roles, `, token: `, token)
  if (config.isDevelopment && !token) {
    const user = await repository.findOne({ where: { name: 'admin' } })
    token = await generateToken(user)
    console.log(
      `🔥 Dummy user was selected because app runs under DEV mode and the token was undefined.`,
      user
    )
  }
  const payload = await verifyToken(token)
  const user = await repository.findOneOrFail({
    where: { id: payload.id }
  })

  const newToken = await generateToken(user)
  await saveTokenToResponseCookie(response, newToken)
  return !!payload
}

export default authChecker
