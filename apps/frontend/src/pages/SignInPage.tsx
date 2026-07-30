import { SignIn } from "@clerk/react";

export default function SignInPage() {
  return (
    <main className="auth-page">
      <SignIn
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/dashboard"
      />
    </main>
  );
}