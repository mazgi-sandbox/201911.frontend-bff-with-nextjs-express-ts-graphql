/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/react-in-jsx-scope */
import DefaultTemplate from 'components/templates/default'
import SignInForm from 'components/organisms/signin/Form'

const Page = () => {
  return (
    <DefaultTemplate title="Sign in">
      <SignInForm />
    </DefaultTemplate>
  )
}

export default Page
