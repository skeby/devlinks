import Navbar from "../components/layout/navbar";
import { getTokens } from "next-firebase-auth-edge";
import { cookies } from "next/headers";
import { clientConfig, serverConfig } from "./../config/firebase.config";
import TokensProvider from "./../context/tokens-provider";

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
      <main className="mx-auto flex h-full min-h-screen w-full max-w-[1440px] flex-col bg-grey-light">
        <Navbar />
        {children}
      </main>
    </TokensProvider>
  );
};

export default MainLayout;
