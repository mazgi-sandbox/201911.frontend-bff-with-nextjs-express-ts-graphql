/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/react-in-jsx-scope */
import DefaultTemplate from 'components/templates/default'
import List from 'components/organisms/images/list'
import fetchGraphQLData from 'lib/graphql/request'
import gql from 'graphql-tag'

const Page = ({ images }) => {
  return (
    <DefaultTemplate>
      <List items={images} />
    </DefaultTemplate>
  )
}

Page.getInitialProps = async () => {
  const query = gql`
    query {
      images {
        id
        data
      }
    }
  `
  const images = await fetchGraphQLData(query, 'images')
    .then(images => {
      console.log(`images: `, images)
      return images
    })
    .catch(reason => {
      console.log(`reason: `, reason)
      return []
    })

  return { images }
}

export default Page
