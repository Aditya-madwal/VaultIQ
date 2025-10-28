import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";

export default async function HomePage() {
  const user = await currentUser();

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="max-w-lg w-full space-y-4 text-center">
        <h1 className="text-2xl font-semibold">Welcome</h1>
        {user ? (
          <div className="space-y-4">
            <div className="space-y-1">
              <p>
                Name: {user.firstName} {user.lastName}
              </p>
              <p>Email: {user.emailAddresses?.[0]?.emailAddress}</p>
            </div>
            <SignOutButton redirectUrl="/sign-in">
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
                Sign Out
              </button>
            </SignOutButton>
          </div>
        ) : null}
      </div>
    </main>
  );
}
