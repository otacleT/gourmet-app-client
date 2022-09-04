import Link from "next/link";
import { FC, useState } from "react";
import { useAuth } from "src/context/auth";
import { MyProfile } from "../MyProfile";
import { UserIcon } from "../UserIcon";
import { WalletConnect } from "../WalletConnect";

export const Header: FC = () => {
  const { fbUser, user } = useAuth();
  const [isMypage, setIsMypage] = useState<boolean>(false);

  return (
    <header className="w-full">
      <div className="max-w-6xl mx-auto h-[70px] px-5 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold">Gourmet APP</a>
        </Link>
        <div className="hidden md:flex justify-between items-center">
          {fbUser ? (
            user ? (
              <WalletConnect />
            ) : (
              <Link href="/create-account">
                <a className="text-sm leading-none cursor-pointer font-bold text-white bg-[#2cb696] p-3 mr-5 rounded-md">
                  アカウント作成
                </a>
              </Link>
            )
          ) : (
            <Link href="/login">
              <a className="text-sm leading-none cursor-pointer font-bold text-white bg-[#2cb696] p-3 mr-5 rounded-md">
                ログイン
              </a>
            </Link>
          )}

          <UserIcon setIsMypage={setIsMypage} />
        </div>
      </div>
      <MyProfile isMypage={isMypage} setIsMypage={setIsMypage} />
    </header>
  );
};
