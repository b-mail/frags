import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import Nav from "@/components/nav/Nav";
import Providers from "@/components/utils/Providers";

const notoSansKR = Noto_Sans_KR({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FRAGS",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko" className="bg-slate-800 text-slate-50">
      <body className={`${notoSansKR.className} flex min-h-screen flex-col`}>
        <Providers>
          <header>
            <Nav />
          </header>
          <main className="flex flex-1 flex-col items-center px-4 pt-24 w-full md:px-8 md:pt-32">
            {children}
          </main>
          <footer className="h-48"></footer>
        </Providers>
      </body>
    </html>
  );
}
