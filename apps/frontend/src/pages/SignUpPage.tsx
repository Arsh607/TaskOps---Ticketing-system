import { SignUp } from "@clerk/react";

export default function SignUpPage() {
  return (
    <main className="auth-page">
      <SignUp
        signInUrl="/sign-in"
        fallbackRedirectUrl="/dashboard"
      />
    </main>
  );
}