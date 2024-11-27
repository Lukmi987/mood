import { SignUp } from '@clerk/nextjs'

const SignUpPage = () => {
  return <SignUp fallbackRedirectUrl="/new-user" forceRedirectUrl="/new-user" />
}

export default SignUpPage
