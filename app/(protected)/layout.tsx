import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ensureUserSynced } from "../lib/syncUser";
import Sidebar from "../components/Sidebar";
import ChatWidgetWrapper from "../components/ChatWidgetWrapper";
import DashboardHeader from "../components/DashboardHeader";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }

  await ensureUserSynced();

  return (
    <div className="flex h-screen w-full bg-black text-zinc-100 selection:bg-zinc-700 selection:text-white overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto relative h-screen">
        <DashboardHeader />

        <div className="p-5 max-w-7xl mx-auto">{children}</div>

        <ChatWidgetWrapper />
      </main>
    </div>
  );
}
