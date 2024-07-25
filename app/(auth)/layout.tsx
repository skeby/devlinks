import Logo from "@/app/components/shared/logo";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen w-full flex-col justify-center items-center bg-grey-light gap-y-[51px]">
      <Logo />
      {children}
    </div>
  );
};

export default AuthLayout;
