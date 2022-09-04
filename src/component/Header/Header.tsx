import Link from "next/link";
import { FC, useState } from "react";
import { useMetamask } from "src/context/metamask";
import { HeaderButton } from "../HeaderButton";
import { MyProfile } from "../MyProfile";
import { UserIcon } from "../UserIcon";

export const Header: FC = () => {
  const [isMypage, setIsMypage] = useState<boolean>(false);
  const { hasMetamask } = useMetamask();

  return (
    <header className="w-full">
      <div className="max-w-6xl mx-auto h-[70px] px-5 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold">Gourmet APP</a>
        </Link>
        {hasMetamask && (
          <div className="hidden md:flex justify-between items-center">
            <HeaderButton />
            <UserIcon setIsMypage={setIsMypage} />
          </div>
        )}
      </div>
      <MyProfile isMypage={isMypage} setIsMypage={setIsMypage} />
    </header>
  );
};
