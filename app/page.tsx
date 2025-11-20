"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    redirect("/dashboard");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary">
      <div className="text-center">
        <p className="text-lg">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
