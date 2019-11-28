import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import Image from 'entities/Image'
import { getRepository } from 'typeorm'

@Resolver(of => Image)
class ImageResolver {
  repository = getRepository(Image)

  @Mutation(returns => Image)
  async uploadImage(@Arg('data') data: string): Promise<Image> {
    console.log(`upload image`)
    const image = new Image()
    image.data = data
    await this.repository.save(image)
    return image
  }

  @Authorized()
  @Query(returns => Image, { nullable: true })
  async user(@Arg('id') id?: string): Promise<Image> {
    const image = await this.repository.findOne({ where: { id } })
    return image
  }

  @Authorized()
  @Query(returns => [Image], { nullable: false })
  async images(): Promise<Image[]> {
    const images = this.repository.find()
    return images
  }
}
export default ImageResolver
