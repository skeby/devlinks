import { Button } from "@/app/lib/antd";

interface Props {
  buttonEnabled: boolean;
}

const Footer = ({ buttonEnabled = false }: Props) => {
  return (
    <footer className="py-6 px-10 border-t border-[#D9D9D9]">
      <Button
        htmlType="submit"
        type="primary"
        disabled={true}
        className="float-right h-auto py-[11px] px-[27px] heading-s rounded-lg disabled:bg-[#633CFF40] disabled:text-white"
      >
        Save
      </Button>
    </footer>
  );
};

export default Footer;
