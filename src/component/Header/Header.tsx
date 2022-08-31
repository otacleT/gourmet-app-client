import { Avatar, Drawer, Image, Menu } from "@mantine/core";
import { useEthers } from "@usedapp/core";
import Link from "next/link";
import { FC, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useAuth } from "src/context/auth";
import { useHistory } from "src/hook/History";
import { logout } from "src/lib/firebase/auth";

export const Header: FC = () => {
  const { activateBrowserWallet, account } = useEthers();
  const { fbUser, user } = useAuth();
  const [isMypage, setIsMypage] = useState<boolean>(false);
  const { history } = useHistory();

  return (
    <header className="w-full">
      <div className="max-w-6xl mx-auto h-[70px] px-5 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold">Gourmet APP</a>
        </Link>
        <div className="flex justify-between items-center">
          {!fbUser && (
            <Link href="/login">
              <a className="text-sm leading-none cursor-pointer font-medium text-white bg-[#2cb696] p-3 mr-5 rounded-md">
                Login
              </a>
            </Link>
          )}
          {fbUser &&
            (account ? (
              <div className="text-sm leading-none cursor-pointer font-medium text-white bg-[#2cb696] p-3 mr-5 rounded-md">
                Connected
              </div>
            ) : (
              <button
                className="text-sm leading-none cursor-pointer font-medium text-white bg-[#2cb696] p-3 mr-5 rounded-md"
                onClick={activateBrowserWallet}
              >
                Connect wallet
              </button>
            ))}
          {fbUser ? (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <div className="relative ">
                  <Avatar
                    src={fbUser.photoURL}
                    radius="xl"
                    className="shadow-md shadow-[#aeaeae]"
                  />
                  <IoIosArrowDown className="w-[11px] h-[11px] absolute bottom-0 right-0 z-5 rounded-full bg-white shadow-sm shadow-black" />
                </div>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Menu</Menu.Label>
                <Menu.Item onClick={() => setIsMypage(true)}>My page</Menu.Item>
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
      <Drawer
        opened={isMypage}
        onClose={() => setIsMypage(false)}
        position="right"
        overlayOpacity={0.55}
        overlayBlur={3}
        size="430px"
        className="h-[calc(100vh-70px)]  top-auto bottom-0 px-10"
      >
        {fbUser?.photoURL !== null && (
          <div className="w-full flex justify-between">
            <Image
              height={100}
              width={100}
              src={fbUser?.photoURL}
              className="rounded-full overflow-hidden"
            />
            <div className="w-[calc(100%-115px)]">
              <p className="text-xl font-bold">{user?.nickname}</p>
              <p className="text-sm">{fbUser?.email}</p>
              <div className="flex justify-between mt-2">
                <p className="text-xs">プロフィール充実度</p>
                <p className="text-sm">75%</p>
              </div>
              <div className="h-3 w-full rounded-full border border-[#aeaeae] relative box-content">
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-3 bg-[#2cb696] rounded-full text-sm text-white flex items-center justify-center"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
          </div>
        )}
        <h3 className="text-2xl font-bold mt-5">Your profile</h3>
        <dl className="flex justify-between items-center flex-wrap mt-2">
          <dt className="w-1/3 text-sm mt-1">Address</dt>
          <dd className="w-2/3 text-center mt-1">{user?.address}</dd>
          <dt className="w-1/3 text-sm mt-1">Sex</dt>
          <dd className="w-2/3 text-center mt-1">{user?.sex}</dd>
          <dt className="w-1/3 text-sm mt-1">Birth</dt>
          <dd className="w-2/3 text-center mt-1">{user?.birth}</dd>
        </dl>
        <h3 className="text-2xl font-bold mt-7">History</h3>
        {history.map((item) => (
          <dl
            className="flex items-end mt-2"
            key={Math.round(Math.random() * 10000)}
          >
            <dt className="w-3/4 mt-1 font-bold">
              {item.name}
              <br />
              <span className="text-xs font-normal">{item.address}</span>
            </dt>
            <dd className="w-1/4 text-xl text-center mt-1">★{item.star}</dd>
          </dl>
        ))}
      </Drawer>
    </header>
  );
};
