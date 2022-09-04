import Link from "next/link";
import { useAuth } from "src/context/auth";
import { WalletConnect } from "../WalletConnect";

export const HeaderButton = () => {
  const { user, fbUser } = useAuth();
  if (fbUser && user) {
    return <WalletConnect />;
  } else if (!user) {
    return (
      <Link href="/create-account">
        <a className="text-sm leading-none cursor-pointer font-bold text-white bg-[#2cb696] p-3 mr-5 rounded-md">
          アカウント作成
        </a>
      </Link>
    );
  } else {
    return (
      <Link href="/login">
        <a className="text-sm leading-none cursor-pointer font-bold text-white bg-[#2cb696] p-3 mr-5 rounded-md">
          ログイン
        </a>
      </Link>
    );
  }
};
