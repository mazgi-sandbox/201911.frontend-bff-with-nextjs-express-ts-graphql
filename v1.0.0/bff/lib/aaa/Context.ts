import { Request, Response } from 'express'
import User from 'entities/User'

export interface Context {
  request: Request
  response: Response
  user: User
}
