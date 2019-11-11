import Config from 'config'
import { RequestHandler } from 'express'
import User from 'entities/User'
import { getRepository } from 'typeorm'
import { verifyToken } from 'lib/jwt'

export const cookieTokenParser: RequestHandler = async (req, res, next) => {
  const config = await Config.getConfig()
  const token = req.cookies.token
  if (token) {
    const payload = await verifyToken(token)
    if (payload) {
      const userId = payload.id
      console.log(`request userId: `, userId)
      if (config.isDevelopment) {
        const repository = getRepository(User)
        const user = await repository.findOne({ where: { id: userId } })
        console.log(`request user: `, user)
      }
      res.locals.userId = userId
    }
  }
  next()
}
