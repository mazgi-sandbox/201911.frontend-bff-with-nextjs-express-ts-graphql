import * as bcrypt from 'bcrypt'
import { Authorized, Field, ID, ObjectType } from 'type-graphql'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'
import { IsEmail, validate } from 'class-validator'
import ValidationError from 'lib/validator/ValidationError'
import validatePassword from 'lib/validator/validatePassword'

@ObjectType()
@Entity()
class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({
    unique: true
  })
  name: string

  @Field()
  @Column({
    unique: true
  })
  @IsEmail()
  email: string

  @Field()
  @Column({
    unique: true
  })
  displayName: string

  @Column({
    nullable: true
  })
  hashedPassword: string
  // volatile field
  password: string

  @BeforeInsert()
  @BeforeUpdate()
  updatePassword: () => Promise<void> = async () => {
    if (!this.password) {
      return
    }
    const validationErrors = validatePassword(this.password)
    if (validationErrors.length > 0) {
      throw new ValidationError(
        `Validation failed. ${JSON.stringify(validationErrors)}`,
        validationErrors
      )
    }
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.hashedPassword = hashedPassword
  }

  comparePassword: (
    plainTextPassword: string
  ) => Promise<boolean> = async plainTextPassword => {
    const match = await bcrypt.compare(plainTextPassword, this.hashedPassword)
    return match
  }
}
export default User
