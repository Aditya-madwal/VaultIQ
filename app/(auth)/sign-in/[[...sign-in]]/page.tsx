import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="auth-page-container">
      <h1
        className="absolute top-6 left-6 text-2xl font-bold text-white"
        style={{ fontFamily: "Montserrat, sans-serif" }}>
        WorkNest
      </h1>
      <div className="auth-content-wrapper">
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
