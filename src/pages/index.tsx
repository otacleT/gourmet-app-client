import { NextPage } from "next";
import Image from "next/image";
import { login, logout } from "src/lib/firebase/auth";

const Home: NextPage = () => {
  return (
    <main>
      <div className="w-full max-w-6xl px-5 pt-60 pb-80 mx-auto relative">
        <p className="text-2xl font-bold ">信頼度に応じた飲食店評価アプリ</p>
        <div className="flex items-center mt-10">
          <button
            className="w-[150px] text-xl text-center py-3 px-4 rounded-lg bg-[#55c08f] text-white mr-10"
            onClick={login}
          >
            Login
          </button>
          <button
            className="w-auto text-xl text-center py-1 border-b-2 border-black"
            onClick={logout}
          >
            Guest start
          </button>
        </div>
        <div className="absolute right-1/3 top-[30px] z-1">
          <div className="w-[230px] h-[310px] relative">
            <div className="Comment w-[145px] h-[80px] opacity-0 scale-50 flex items-center justify-center rounded-[50%] border-2 border-[#333] bg-white absolute left-0 top-[30px] -translate-x-[15%] animate-comment01Show">
              <p className="text-lg font-bold tracking-wider inline-block">
                Good!
              </p>
            </div>
            <div className="w-[80px] h-[200px] absolute right-0 bottom-0 text-center z-5">
              <Image
                className="object-contain z-10 opacity-0 translate-y-[20px] animate-peopleShow"
                src="/people01.png"
                layout="fill"
              />
            </div>
            <div className="w-0 h-0 rounded-[50%] bg-[#aeaeae] absolute -right-[25px] -bottom-[10px] z-1 -translate-x-1/2 -translate-y-1/2 animate-circleShow"></div>
          </div>
        </div>
        <div className="absolute right-1/3 bottom-[20px] z-2">
          <div className="w-[230px] h-[310px] relative">
            <div className="Comment w-[145px] h-[80px] opacity-0 scale-50 flex items-center justify-center rounded-[50%] border-2 border-[#333] bg-white absolute left-0 top-[30px] -translate-x-[15%] animate-comment01Show">
              <p className="text-lg font-bold tracking-wider inline-block">
                Yummy!
              </p>
            </div>
            <div className="w-[90px] h-[200px] absolute right-0 bottom-0 text-center z-5">
              <Image
                className="object-contain z-10 opacity-0 translate-y-[20px] animate-peopleShow"
                src="/people02.png"
                layout="fill"
              />
            </div>
            <div className="w-0 h-0 rounded-[50%] bg-[#aeaeae] absolute -right-[20px] -bottom-[10px] z-1 -translate-x-1/2 -translate-y-1/2 animate-circleShow"></div>
          </div>
        </div>
        <div className="absolute right-[40px] bottom-1/4 z-3">
          <div className="w-[230px] h-[310px] relative">
            <div className="Comment w-[145px] h-[80px] opacity-0 scale-50 flex items-center justify-center rounded-[50%] border-2 border-[#333] bg-white absolute left-0 top-[30px] -translate-x-[15%] animate-comment01Show">
              <p className="text-lg font-bold tracking-wider inline-block">
                Nice!
              </p>
            </div>
            <div className="w-[86px] h-[200px] absolute right-0 bottom-0 text-center z-5">
              <Image
                className="object-contain z-10 opacity-0 translate-y-[20px] animate-peopleShow"
                src="/people03.png"
                layout="fill"
              />
            </div>
            <div className="w-0 h-0 rounded-[50%] bg-[#aeaeae] absolute -right-[23px] -bottom-[10px] z-1 -translate-x-1/2 -translate-y-1/2 animate-circleShow"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
