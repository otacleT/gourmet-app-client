import { Avatar, Menu, Text } from "@mantine/core";
import { useEthers } from "@usedapp/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";
import { useAuth } from "src/context/auth";
import { login, logout } from "src/lib/firebase/auth";

export const Header: FC = () => {
  const { activateBrowserWallet, account } = useEthers();
  const { fbUser } = useAuth();
  const router = useRouter();
  const handleLogout = useCallback(async () => {
    await logout();
    router.push("/");
  }, []);
  return (
    <header className="w-full">
      <div className="max-w-6xl mx-auto h-[70px] px-5 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold">Gourmet APP</a>
        </Link>
        <div className="flex justify-between items-center">
          {fbUser ? (
            <button
              className="text-sm cursor-pointer text-[#efefef] bg-[#55c08f] py-2 px-3 mr-5 rounded-md"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <a className="text-sm cursor-pointer text-[#efefef] bg-[#55c08f] py-2 px-3 mr-5 rounded-md">
                Login
              </a>
            </Link>
          )}
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
          {fbUser ? (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar src={fbUser.photoURL} radius="xl" />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Menu</Menu.Label>
                <Menu.Item>My page</Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red">Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Avatar radius="xl" />
          )}
        </div>
      </div>
    </header>
  );
};
