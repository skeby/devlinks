import Navbar from "../components/layout/navbar";
import Image from "next/image";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "../config/firebase.config";
import TokensProvider from "../context/tokens-provider";
import MobileSimLink from "../components/shared/mobile-sim/mobile-sim-link";
import MobileSimImage from "../components/shared/mobile-sim/mobile-sim-image";
import MobileSimName from "../components/shared/mobile-sim/mobile-sim-name";
import MobileSimEmail from "../components/shared/mobile-sim/mobile-sim-email";

const MainLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const tokens = await getTokens(await cookies(), {
    apiKey: clientConfig.apiKey,
    cookieName: serverConfig.cookieName,
    cookieSignatureKeys: serverConfig.cookieSignatureKeys,
    serviceAccount: serverConfig.serviceAccount,
  });
  return (
    <TokensProvider tokens={tokens}>
      <main className="max-w-[1440px] flex flex-col mx-auto w-full min-h-screen h-full bg-grey-light">
        <Navbar />
        {children}
      </main>
    </TokensProvider>
  );
};

export default MainLayout;
