import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="auth-page-container">
      <div className="auth-content-wrapper">
        <h1 className="text-4xl font-bold text-center text-white font-poppins mb-2">
          Welcome Back
        </h1>
        <p className="text-white text-center mb-8">
          Sign in to your VaultIQ account
        </p>
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
