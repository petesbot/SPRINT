import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sprint — Your AI Fitness Coach",
  description:
    "Personalised strength, sprint, and mobility plans that adapt to your schedule, history, and goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
