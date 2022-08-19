import { Avatar } from "@mantine/core";
import { useEthers } from "@usedapp/core";
import { FC } from "react";

export const Header: FC = () => {
  const { activateBrowserWallet, account } = useEthers();
  return (
    <header className="w-full bg-[#333333]">
      <div className=" h-[70px] px-5 flex justify-between items-center">
        <p className="text-[20px] font-bold text-white">Gourmet APP</p>
        <div className="flex justify-between items-center">
          {account ? (
            <div
              className="text-sm cursor-pointer text-[#efefef] bg-inherit py-2 px-2 mr-5 rounded-sm"
              style={{ border: "1px solid #57606a" }}
            >
              Connected
            </div>
          ) : (
            <button
              className="text-sm cursor-pointer text-[#efefef] bg-inherit py-2 px-2 mr-5 rounded-sm"
              style={{ border: "1px solid #57606a" }}
              onClick={activateBrowserWallet}
            >
              Connect wallet
            </button>
          )}
          <Avatar radius="xl" />
        </div>
      </div>
    </header>
  );
};
