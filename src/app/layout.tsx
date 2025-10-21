import type { Metadata } from "next";
import "./globals.css";
import ScrollToTopButton from "@/app/components/ScrollToTopButton";
import Header from "@/app/components/Header";

export const metadata: Metadata = {
  title: "JWC Portfolio",
  description: "Portfolio for Justin W Cain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col justify-center items-center">
          <Header />
          <main className="max-w-5xl">{children}</main>
          <div className="flex flex-col justify-center items-center mb-4">
            <ScrollToTopButton />
          </div>
        </div>
      </body>
    </html>
  );
}
