import Config from 'config'
import { HoursToMilliseconds } from 'lib/datetime/const'
import { Response } from 'express'

export const saveTokenToResponseCookie = async (
  response: Response,
  token: string
): Promise<void> => {
  const config = await Config.getConfig()
  response.cookie('token', token, {
    maxAge: 7 /* days */ * 24 * HoursToMilliseconds,
    secure: !config.isDevelopment,
    httpOnly: true
  })
}
