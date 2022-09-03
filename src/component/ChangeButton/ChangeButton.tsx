import Link from "next/link";
import { FC } from "react";
import { useAuth } from "src/context/auth";

export const ChangeButton: FC = () => {
  const { user, fbUser } = useAuth();
  if (fbUser) {
    if (user) {
      return (
        <Link href="/map">
          <a className="text-lg font-bold text-white text-center py-3 px-6 rounded-md bg-[#2cb696] mr-10">
            マップに戻る
          </a>
        </Link>
      );
    } else {
      return (
        <Link href="/create-account">
          <a className="text-lg font-bold text-white text-center py-3 px-6 rounded-md bg-[#2cb696] mr-10">
            アカウントを作成する
          </a>
        </Link>
      );
    }
  } else {
    return (
      <Link href="/login">
        <a className="text-lg font-bold text-white text-center py-3 px-6 rounded-md bg-[#2cb696] mr-10">
          ログインして始める
        </a>
      </Link>
    );
  }
};
