import Navbar from "../components/layout/navbar";

const MainLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="mx-auto flex h-full min-h-screen w-full max-w-[1440px] flex-col bg-grey-light">
      <Navbar />
      {children}
    </main>
  );
};

export default MainLayout;
