import { Avatar } from "@mantine/core";
import { useEthers } from "@usedapp/core";
import { FC } from "react";

export const Header: FC = () => {
  const { activateBrowserWallet, account } = useEthers();
  return (
    <header className="w-full">
      <div className="max-w-6xl mx-auto h-[70px] px-5 flex justify-between items-center">
        <p className="text-[20px] font-bold">Gourmet APP</p>
        <div className="flex justify-between items-center">
          {account ? (
            <div
              className="text-md cursor-pointer text-[#efefef] bg-[#55c08f] py-2 px-3 mr-5 rounded-md"
              // style={{ border: "1px solid #57606a" }}
            >
              Connected
            </div>
          ) : (
            <button
              className="text-md cursor-pointer text-[#efefef] bg-[#55c08f] py-2 px-3 mr-5 rounded-md"
              // style={{ border: "1px solid #57606a" }}
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
