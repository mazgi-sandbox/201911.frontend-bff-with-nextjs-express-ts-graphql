import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql'
import { CannotSignInError } from './error/CannotSignInError'
// avoid `Cannot read property 'prototype' of undefined` runtime error.
import SignInResultMiddleware from 'lib/aaa/SignInResultMiddleware'
import User from 'entities/User'
import { getRepository } from 'typeorm'

@Resolver()
class SignInResolver {
  repositoryForUser = getRepository(User)

  @UseMiddleware(SignInResultMiddleware)
  @Query(returns => String, { nullable: true })
  async hello(): Promise<string> {
    return null
  }

  @UseMiddleware(SignInResultMiddleware)
  @Mutation(returns => User, { nullable: true })
  async signIn(
    @Arg('email') email: string,
    @Arg('password', { nullable: true }) password?: string
  ): Promise<User> {
    console.log(`signIn: email: ${email}`)
    const user = await this.repositoryForUser.findOne({ where: { email } })
    if (!user) {
      throw new CannotSignInError(
        `Cannot sign in as a valid user. Please check the email and password that your input.`
      )
    }
    if (!(await user.comparePassword(password))) {
      throw new CannotSignInError(
        `Cannot sign in as a valid user. Please check the email and password that your input.`
      )
    }
    return user
  }
}

export default SignInResolver
