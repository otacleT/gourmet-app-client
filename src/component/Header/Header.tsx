import { Avatar, Button, Dialog, Drawer, Menu, Modal } from "@mantine/core";
import { useEthers } from "@usedapp/core";
import Link from "next/link";
import { FC, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoIosArrowDown } from "react-icons/io";
import { useAuth } from "src/context/auth";
import { useHistory } from "src/hook/History";
import { login, logout } from "src/lib/firebase/auth";

export const Header: FC = () => {
  const { activateBrowserWallet, account } = useEthers();
  const { fbUser, user } = useAuth();
  const [isMypage, setIsMypage] = useState<boolean>(false);
  const { history } = useHistory();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <header className="w-full">
      <div className="max-w-6xl mx-auto h-[70px] px-5 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold">Gourmet APP</a>
        </Link>
        <div className="flex justify-between items-center">
          {!fbUser && (
            <button
              onClick={() => setIsLogin(true)}
              className="text-sm leading-none cursor-pointer font-medium text-white bg-[#2cb696] p-3 mr-5 rounded-md"
            >
              Login
            </button>
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
      <Modal
        opened={isLogin}
        withCloseButton={false}
        onClose={() => setIsLogin(false)}
        size="480px"
        centered
        className="text-lg font-medium"
      >
        <h1 className="text-2xl font-bold text-center pt-20">
          信頼度に応じた飲食店評価アプリ
        </h1>
        <div className="w-[330px] mx-auto mt-14 mb-20">
          <Button
            leftIcon={<FcGoogle />}
            className="w-full text-lg text-[#333] border-2 border-[#efefef] h-14 hover:bg-[#efefef]"
            onClick={login}
          >
            Sign in with Google
          </Button>
        </div>
      </Modal>
      <Drawer
        opened={isMypage}
        onClose={() => setIsMypage(false)}
        position="right"
        overlayOpacity={0.55}
        overlayBlur={3}
        className="h-[calc(100vh-70px)] top-auto bottom-0"
      >
        {fbUser?.photoURL !== null && (
          // <Image
          //   height={100}
          //   width={100}
          //   src={fbUser?.photoURL}
          //   className="rounded-full overflow-hidden blur-md invert drop-shadow-2xl shadow-black"
          // />
          <div className="relative w-28 h-28 mx-auto">
            <div className="w-[calc(100%+10px)] h-[calc(100%+10px)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-1 border-2 border-[#2cb696]"></div>
            <img
              className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 rounded-full"
              src={fbUser?.photoURL}
              alt=""
            />
          </div>
        )}
        <p className="text-xl font-bold text-center mt-4">{user?.nickname}</p>
        <p className="text-sm text-center">{fbUser?.email}</p>
        <p className="text-lg text-center">{user?.address}</p>
        <p className="text-lg text-center">{user?.sex}</p>
        {history.map((item) => (
          <ul key={Math.round(Math.random() * 10000)}>
            {item.name}
            {item.address}
            {item.category}
            {item.star}
          </ul>
        ))}
      </Drawer>
    </header>
  );
};
