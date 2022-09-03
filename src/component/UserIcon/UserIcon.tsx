import { Avatar, Menu } from "@mantine/core";
import { Dispatch, FC, SetStateAction } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useAuth } from "src/context/auth";
import { logout } from "src/lib/firebase/auth";

type Props = {
  setIsMypage: Dispatch<SetStateAction<boolean>>;
};

export const UserIcon: FC<Props> = (props) => {
  const { setIsMypage } = props;
  const { fbUser } = useAuth();
  if (fbUser) {
    return (
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
    );
  } else {
    return <Avatar radius="xl" />;
  }
};
