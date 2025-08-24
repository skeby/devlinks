import Logo from "@/app/components/shared/logo";

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen w-full flex-col gap-y-16 bg-white p-8 sm:items-center sm:justify-center sm:gap-y-[51px] sm:bg-grey-light sm:px-10 sm:py-10">
      <Logo />
      {children}
    </div>
  );
};

export default AuthLayout;
