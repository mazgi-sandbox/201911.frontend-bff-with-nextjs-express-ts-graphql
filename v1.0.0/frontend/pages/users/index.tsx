/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/react-in-jsx-scope */
import DefaultTemplate from 'components/templates/default'
import List from 'components/organisms/users/list'
import fetchGraphQLData from 'lib/graphql/request'
import gql from 'graphql-tag'

const Page = ({ users }) => {
  return (
    <DefaultTemplate>
      <List rows={users} />
    </DefaultTemplate>
  )
}

Page.getInitialProps = async () => {
  const query = gql`
    query {
      users {
        id
        name
        displayName
        email
      }
    }
  `
  const users = await fetchGraphQLData(query, 'users')
    .then(users => {
      console.log(`users: `, users)
      return users
    })
    .catch(reason => {
      console.log(`reason: `, reason)
      return []
    })

  return { users }
}

export default Page
