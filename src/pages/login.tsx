import { Button } from "@mantine/core";
import { FcGoogle } from "react-icons/fc";
import { login, logout } from "src/lib/firebase/auth";

const Login = () => {
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

export default Login;
