import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="auth-page-container">
      <div className="auth-content-wrapper">
        <h1 className="text-4xl font-bold text-center text-white font-poppins mb-2">
          Welcome Back
        </h1>
        <p className="text-white text-center mb-8">
          Create your account to get started
        </p>
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
