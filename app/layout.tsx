import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/next";
import Providers from "./components/misc/providers";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "./config/firebase.config";
import TokensProvider from "./context/tokens-provider";
import "./globals.css";

const instrumentSans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevLinks | Link Sharing Made Easy",
  description: "Share your links easily with devlinks",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const tokens = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });
  return (
    <html lang="en">
      <body className={instrumentSans.className}>
        <Analytics />
        <TokensProvider tokens={tokens}>
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
        </TokensProvider>
      </body>
    </html>
  );
}
