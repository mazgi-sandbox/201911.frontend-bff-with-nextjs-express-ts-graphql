import * as fs from 'fs'
import * as path from 'path'
import {
  AfterInsert,
  AfterLoad,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
@Entity()
class Image {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  // @Field()
  // @Column()
  // format: string

  // @Field()
  // @Column({ unique: true })
  // checksum: string

  // volatile field
  @Field()
  data: string

  @AfterInsert()
  saveImage: () => Promise<void> = async () => {
    const tmpdir = path.resolve(process.cwd(), '.tmp')
    if (!this.data) {
      throw new Error('"data" is required.')
    }
    // TODO: validate format

    const raw = new Buffer(this.data, 'base64').toString('binary')
    fs.writeFileSync(`${tmpdir}/${this.id}.jpeg`, raw, 'binary')
  }

  @AfterLoad()
  loadImage: () => Promise<void> = async () => {
    const tmpdir = path.resolve(process.cwd(), '.tmp')
    const raw = fs.readFileSync(`${tmpdir}/${this.id}.jpeg`, 'binary')
    const base64image = new Buffer(raw, 'binary').toString('base64')
    this.data = base64image
  }
}
export default Image
