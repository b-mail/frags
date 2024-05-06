import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import Nav from "@/components/Nav";

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
        <header>
          <Nav />
        </header>
        <main className="mt-24 flex flex-col items-center">{children}</main>
        <footer></footer>
      </body>
    </html>
  );
}
