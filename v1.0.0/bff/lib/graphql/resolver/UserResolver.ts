import { Arg, Authorized, Query, Resolver } from 'type-graphql'
import User from 'entities/User'
import { getRepository } from 'typeorm'

@Resolver(of => User)
class UserResolver {
  repository = getRepository(User)

  @Authorized()
  @Query(returns => User, { nullable: true })
  async user(
    @Arg('id', { nullable: true }) id?: string,
    @Arg('email', { nullable: true }) email?: string
  ): Promise<User> {
    const user = id
      ? await this.repository.findOne({ where: { id } })
      : await this.repository.findOne({ where: { email } })
    return user
  }

  @Authorized()
  @Query(returns => [User], { nullable: false })
  async users(): Promise<User[]> {
    const users = this.repository.find()
    return users
  }
}
export default UserResolver
