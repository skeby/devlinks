import { ReactNode } from "react";
import Navbar from "../components/layout/navbar";
import Image from "next/image";
import { Skeleton } from "@/app/lib/antd";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <main className="max-w-[1440px] flex flex-col mx-auto w-full min-h-screen h-full bg-grey-light">
      <Navbar />
      <div className="flex gap-x-6 px-6 flex-1 pb-6">
        <section className="bg-white rounded-xl w-[40%] flex items-center justify-center gap-10">
          <div className="relative">
            <Image
              src={"/icon/phone-frame.svg"}
              width={307}
              height={631}
              alt="phone frame"
            />
            <div className="w-[237px] absolute top-[63.5px] bottom-[53.5px] left-[34.5px] right-[35.5px]">
              <div></div>
              <div className="flex flex-col gap-y-5">
                <Skeleton
                  paragraph={{ rows: 0 }}
                  className="!w-full !h-11"
                  rootClassName="!w-full !h-11"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white rounded-xl w-[60%]">{children}</section>
      </div>
    </main>
  );
};

export default MainLayout;
