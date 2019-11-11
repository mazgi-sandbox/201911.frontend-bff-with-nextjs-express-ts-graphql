import Config from 'config'
import User from 'entities/User'
import jwt from 'jsonwebtoken'
import validator from 'validator'

type TokenPayload = {
  id: string
}

export async function generateToken(user: User): Promise<string> {
  const config = await Config.getConfig()
  const payload: TokenPayload = {
    id: user.id
  }
  const generated = jwt.sign(payload, config.privateKey, {
    algorithm: 'RS256',
    expiresIn: '24h'
  })
  return generated
}

export async function verifyToken(token: string): Promise<TokenPayload> {
  if (validator.isEmpty(token)) {
    console.log(`Token is empty.`)
    return null
  }
  const config = await Config.getConfig()
  const decoded = jwt.verify(token, config.publicKey)
  console.log(`The token verified: `, decoded)
  return decoded
}
