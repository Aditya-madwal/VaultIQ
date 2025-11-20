"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary">
      <div className="text-center">
        <p className="text-lg">VaultIQ</p>
      </div>
    </div>
  );
}
