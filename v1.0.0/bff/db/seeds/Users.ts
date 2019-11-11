import Config from 'config'
import User from 'entities/User'
import { getRepository } from 'typeorm'
import { plainToClass } from 'class-transformer'

export async function loadUsers(): Promise<void> {
  const config = await Config.getConfig()
  const repository = getRepository(User)
  const count = await repository.count()
  if (count > 0) {
    return
  }

  const users = plainToClass(User, config.seeds.users)
  await repository.save(users)
  config.isDevelopment && console.log(`loaded users: `, users)
}
