import { Avatar, Menu } from "@mantine/core";
import { useEthers } from "@usedapp/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { useAuth } from "src/context/auth";
import { logout } from "src/lib/firebase/auth";

export const Header: FC = () => {
  const { activateBrowserWallet, account } = useEthers();
  const { user, fbUser } = useAuth();
  const router = useRouter();
  return (
    <header className="w-full">
      <div className="max-w-6xl mx-auto h-[70px] px-5 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold">Gourmet APP</a>
        </Link>
        <div className="flex justify-between items-center">
          {!fbUser && (
            <Link href="/login">
              <a className="text-sm leading-none cursor-pointer text-[#efefef] bg-[#2cb696] p-3 mr-5 rounded-md">
                Login
              </a>
            </Link>
          )}
          {fbUser &&
            (account ? (
              <div
                className="text-sm leading-none cursor-pointer text-[#efefef] bg-[#2cb696] p-3 mr-5 rounded-md"
                // style={{ border: "1px solid #57606a" }}
              >
                Connected
              </div>
            ) : (
              <button
                className="text-sm leading-none cursor-pointer text-[#efefef] bg-[#2cb696] p-3 mr-5 rounded-md"
                // style={{ border: "1px solid #57606a" }}
                onClick={activateBrowserWallet}
              >
                Connect wallet
              </button>
            ))}
          {fbUser ? (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Avatar src={fbUser.photoURL} radius="xl" />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Menu</Menu.Label>
                <Menu.Item>My page</Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red" onClick={logout}>
                  Logout
                </Menu.Item>
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
