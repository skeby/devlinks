"use client";

import { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, message } from "antd";
import { theme } from "@/app/config/antd.config";
import "@ant-design/v5-patch-for-react-19";

message.config({
  maxCount: 3,
});

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AntdRegistry>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </AntdRegistry>
  );
};

export default Providers;
