import { SignIn } from '@clerk/nextjs'

const SignInPage = () => {
  return <SignIn forceRedirectUrl="/journal" />
}

export default SignInPage
