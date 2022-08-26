import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "src/context/auth";
import { login } from "src/lib/firebase/auth";

const LoginPage = () => {
  const { user, fbUser, isLoading } = useAuth();
  const router = useRouter();
  if (isLoading) {
    return <div className="loading"></div>;
  }
  if (user) {
    router.push("/map");
    return null;
  }
  if (fbUser) {
    router.push("/create-account");
    return null;
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
    </div>
  );
};

export default LoginPage;
