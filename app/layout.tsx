import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/next";
import Providers from "./components/misc/providers";
import "./globals.css";

const instrumentSans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevLinks | Link Sharing Made Easy",
  description: "Share your links easily with devlinks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={instrumentSans.className}>
        <Analytics />
        <Providers>
          <NextTopLoader
            color="#633CFF"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #633CFF,0 0 5px #633CFF"
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}
