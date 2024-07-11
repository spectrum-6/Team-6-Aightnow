import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import ClientLayout from "./clientLayout";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pretendard.variable}`}>
      <body className={pretendard.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
