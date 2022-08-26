import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "src/context/auth";
import { login, logout } from "src/lib/firebase/auth";

const LoginPage = () => {
  const { user, fbUser, isLoading } = useAuth();
  const router = useRouter();
  if (fbUser) {
    router.push("/create-account");
    return null;
  }
  if (user) {
    router.push("/");
    return null;
  }
  if (isLoading) {
    return <div className="loading"></div>;
  }
  return (
    <div className="max-w-xl mx-auto pt-20">
      <h1 className="text-2xl text-center font-bold">ログイン</h1>
      <Button
        leftIcon={<FcGoogle />}
        className="w-full text-lg text-black border-2 border-[#efefef] h-14 hover:bg-[#efefef] mt-10"
        onClick={login}
      >
        Google
      </Button>
      <button
        className="w-full text-lg text-black border-2 border-[#efefef] h-14 hover:bg-[#efefef] mt-10"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default LoginPage;
