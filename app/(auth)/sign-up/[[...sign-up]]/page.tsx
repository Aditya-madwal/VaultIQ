import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="auth-page-container">
      <h1
        className="absolute top-6 left-6 text-2xl font-bold text-white"
        style={{ fontFamily: "Montserrat, sans-serif" }}>
        WorkNest
      </h1>
      <div className="auth-content-wrapper">
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
