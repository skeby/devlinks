import Logo from "@/app/components/shared/logo";

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen w-full flex-col sm:py-10 py-8 px-4 sm:px-10 justify-center items-center bg-grey-light gap-y-[51px]">
      <Logo />
      {children}
    </div>
  );
};

export default AuthLayout;
