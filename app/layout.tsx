import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { RouteProvider } from "@/providers/route-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VaultIQ",
  description: "Secure document management and collaboration platform",
};

export const viewport: Viewport = {
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-primary antialiased">
        <ClerkProvider>
          <RouteProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </RouteProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
