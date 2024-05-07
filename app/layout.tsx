import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { ReactNode } from "react";
import "./globals.css";
import Nav from "@/components/Nav";
import Container from "@/lib/Container";

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
        <Container>
          <header>
            <Nav />
          </header>
          <main className="flex flex-col items-center px-24 pt-24">
            {children}
          </main>
          <footer className="h-48"></footer>
        </Container>
      </body>
    </html>
  );
}
