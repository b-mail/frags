import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import Nav from "@/components/nav/Nav";
import ReactQueryProvider from "@/lib/ReactQueryProvider";

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
    <html lang="ko">
      <body className={notoSansKR.className}>
        <ReactQueryProvider>
          <header>
            <Nav />
          </header>
          <main className="flex flex-col items-center pt-24">{children}</main>
          <footer className="h-48"></footer>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
