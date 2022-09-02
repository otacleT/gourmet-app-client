import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "src/context/auth";

const Home: NextPage = () => {
  const { user, fbUser } = useAuth();
  return (
    <main>
      <div className="w-full h-[calc(100vh-70px)] max-w-6xl px-5 pt-60 mx-auto relative">
        <p className="text-3xl font-bold ">信頼度に応じた飲食店評価アプリ</p>
        <div className="flex items-center mt-10">
          {fbUser ? (
            user ? (
              <Link href="/map">
                <a className="w-[150px] text-xl font-medium text-white text-center py-3 px-4 rounded-lg bg-[#2cb696] mr-10">
                  Start
                </a>
              </Link>
            ) : (
              <Link href="/create-account">
                <a className="w-[200px] text-xl font-medium text-white text-center py-3 px-4 rounded-lg bg-[#2cb696] mr-10">
                  Create Account
                </a>
              </Link>
            )
          ) : (
            <Link href="/login">
              <a className="w-[150px] text-xl font-medium text-white text-center py-3 px-4 rounded-lg bg-[#2cb696] mr-10">
                Login
              </a>
            </Link>
          )}
        </div>
        <div className="absolute right-[35%] top-[40px] z-1">
          <div className="w-[230px] h-[310px] relative">
            <div className="Comment w-[145px] h-[80px] opacity-0 scale-50 flex items-center justify-center rounded-[50%] border-2 border-[#333] bg-white absolute left-0 top-[30px] -translate-x-[15%] animate-comment01Show">
              <p className="text-lg font-bold tracking-wider inline-block">
                Good!
              </p>
            </div>
            <div className="w-[80px] h-[220px] absolute right-0 bottom-0 text-center z-5">
              <Image
                className="object-contain z-10 opacity-0 translate-y-[20px] animate-peopleShow"
                src="/people01.png"
                layout="fill"
              />
            </div>
            <div className="w-0 h-0 rounded-[50%] bg-[#2cb696] absolute right-[40px] bottom-[5px] z-1 translate-x-1/2 translate-y-1/2 animate-circleShow"></div>
          </div>
        </div>
        <div className="absolute right-[35%] bottom-[15%] z-2">
          <div className="w-[230px] h-[310px] relative">
            <div className="Comment w-[145px] h-[80px] opacity-0 scale-50 flex items-center justify-center rounded-[50%] border-2 border-[#333] bg-white absolute -left-[5px] top-[10px] -translate-x-[15%] animate-comment01Show">
              <p className="text-lg font-bold tracking-wider inline-block">
                Yummy!
              </p>
            </div>
            <div className="w-[90px] h-[240px] absolute right-0 bottom-0 text-center z-5">
              <Image
                className="object-contain z-10 opacity-0 translate-y-[20px] animate-peopleShow"
                src="/people02.png"
                layout="fill"
              />
            </div>
            <div className="w-0 h-0 rounded-[50%] bg-[#2cb696] absolute right-[45px] bottom-[5px] z-1 translate-x-1/2 translate-y-1/2 animate-circleShow"></div>
          </div>
        </div>
        <div className="absolute right-[50px] bottom-[30%] z-3">
          <div className="w-[230px] h-[310px] relative">
            <div className="Comment w-[145px] h-[80px] opacity-0 scale-50 flex items-center justify-center rounded-[50%] border-2 border-[#333] bg-white absolute -left-[5px] top-[10px] -translate-x-[15%] animate-comment01Show">
              <p className="text-lg font-bold tracking-wider inline-block">
                Nice!
              </p>
            </div>
            <div className="w-[85px] h-[247px] absolute right-0 bottom-0 text-center z-5">
              <Image
                className="object-contain z-10 opacity-0 translate-y-[20px] animate-peopleShow"
                src="/people03.png"
                layout="fill"
              />
            </div>
            <div className="w-0 h-0 rounded-[50%] bg-[#2cb696] absolute right-[40px] bottom-[5px] z-1 translate-x-1/2 translate-y-1/2 animate-circleShow"></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
