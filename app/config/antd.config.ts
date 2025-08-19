import { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
  token: {
    // fontFamily: "Instrument sans, sans-serif",
  },
  components: {
    Input: {
      colorBorder: "#D9D9D9",
      colorPrimary: "#633CFF",
      controlOutline: "#633CFF",
      hoverBorderColor: "#633CFF",
      colorError: "#FF3939",
      controlOutlineWidth: 0.5,
      colorErrorHover: "#FF3939",
      colorErrorBorderHover: "#FF3939",
      activeShadow: "0px 0px 32px 0px #633CFF40",
    },
    Button: {
      colorPrimary: "#633CFF",
      primaryShadow: "none",
      colorPrimaryHover: "#BEADFF",
      colorBgContainerDisabled: "#BEADFF",
    },
    Select: {
      // colorTextPlaceholder: "#77878F",
      borderRadius: 8,
      colorPrimary: "#633CFF",
      controlOutline: "#633CFF",
      controlOutlineWidth: 0,
      colorError: "#FF3939",
      colorErrorHover: "#FF3939",
      colorPrimaryHover: "#633CFF",
    },
  },
};
