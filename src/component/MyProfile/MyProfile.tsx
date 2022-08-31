import { Drawer, Image } from "@mantine/core";
import { Dispatch, FC, SetStateAction } from "react";
import { useAuth } from "src/context/auth";
import { useHistory } from "src/hook/History";
import { MdFace } from "react-icons/md";
import { IconContext } from "react-icons";

type Props = {
  isMypage: boolean;
  setIsMypage: Dispatch<SetStateAction<boolean>>;
};

export const MyProfile: FC<Props> = (props) => {
  const { isMypage, setIsMypage } = props;
  const { fbUser, user, point } = useAuth();
  const { history } = useHistory();

  return (
    <Drawer
      opened={isMypage}
      onClose={() => setIsMypage(false)}
      position="right"
      overlayOpacity={0.55}
      overlayBlur={3}
      size="430px"
      className="scrollBar h-[calc(100vh-70px)]  top-auto bottom-0 px-10 overflow-y-scroll pb-14"
    >
      <div className="w-full flex justify-between">
        {fbUser?.photoURL ? (
          <Image
            height={100}
            width={100}
            src={fbUser?.photoURL}
            className="rounded-full overflow-hidden"
          />
        ) : (
          <div className="w-[100px] h-[100px] rounded-full flex content-center justify-center flex-wrap border-2 border-[#f6f8fa]">
            <IconContext.Provider value={{ size: "28px" }}>
              <MdFace />
            </IconContext.Provider>
            <span className="w-full text-xs font-medium text-center">
              NO IMAGE
            </span>
          </div>
        )}
        <div className="w-[calc(100%-115px)]">
          <p className="text-xl font-bold">{user?.nickname}</p>
          <p className="text-sm">{fbUser?.email}</p>
          <div className="flex justify-between mt-2">
            <p className="text-xs">プロフィール充実度</p>
            <p className="text-sm">{point}</p>
          </div>
          <div className="h-3 w-full rounded-full border border-[#aeaeae] relative box-content">
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-3 bg-[#2cb696] rounded-full text-sm text-white flex items-center justify-center"
              style={{ width: `${point}%` }}
            ></div>
          </div>
        </div>
      </div>
      <h3 className="text-2xl font-bold mt-5">Your profile</h3>
      <dl className="flex justify-between items-center flex-wrap mt-2">
        <dt className="w-1/3 text-sm mt-1">Name</dt>
        <dd className="w-2/3 text-center mt-1">{user?.name}</dd>
        <dt className="w-1/3 text-sm mt-1">Sex</dt>
        <dd className="w-2/3 text-center mt-1">{user?.sex}</dd>
        <dt className="w-1/3 text-sm mt-1">Birth</dt>
        <dd className="w-2/3 text-center mt-1">{user?.birth}</dd>
        <dt className="w-1/3 text-sm mt-1">Address</dt>
        <dd className="w-2/3 text-center mt-1">{user?.address}</dd>
        <dt className="w-1/3 text-sm mt-1">Job</dt>
        <dd className="w-2/3 text-center mt-1">{user?.job}</dd>
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
  );
};
