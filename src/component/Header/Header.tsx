import { Avatar, Menu } from "@mantine/core";
import Link from "next/link";
import { FC, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useAuth } from "src/context/auth";
import { logout } from "src/lib/firebase/auth";
import { MyProfile } from "../MyProfile";
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
        <div className="flex justify-between items-center">
          {!fbUser && (
            <Link href="/login">
              <a className="text-sm leading-none cursor-pointer font-bold text-white bg-[#2cb696] p-3 mr-5 rounded-md">
                ログイン
              </a>
            </Link>
          )}
          {fbUser &&
            (user ? (
              <WalletConnect />
            ) : (
              <Link href="/create-account">
                <a className="text-sm leading-none cursor-pointer font-bold text-white bg-[#2cb696] p-3 mr-5 rounded-md">
                  アカウント作成
                </a>
              </Link>
            ))}

          {fbUser ? (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <div className="relative">
                  <Avatar
                    src={fbUser.photoURL}
                    radius="xl"
                    className="shadow-md shadow-[#aeaeae]"
                  />
                  <IoIosArrowDown className="w-[11px] h-[11px] absolute bottom-0 right-0 z-5 rounded-full bg-white shadow-sm shadow-black" />
                </div>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>メニュー</Menu.Label>
                <Menu.Item onClick={() => setIsMypage(true)}>
                  アカウント情報
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red" onClick={logout}>
                  ログアウト
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Avatar radius="xl" />
          )}
        </div>
      </div>
      <MyProfile isMypage={isMypage} setIsMypage={setIsMypage} />
    </header>
  );
};
