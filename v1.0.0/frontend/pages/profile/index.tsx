/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/react-in-jsx-scope */
import DefaultTemplate from 'components/templates/default'
import Profile from 'components/organisms/profile'

const Page = () => {
  return (
    <DefaultTemplate title="Welcome">
      <Profile />
    </DefaultTemplate>
  )
}

export default Page
