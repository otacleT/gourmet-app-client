import { Button, Dialog } from "@mantine/core";
import { ChangeEventHandler, SetStateAction, useEffect, useState } from "react";
import { Dispatch, FC } from "react";
import { useCallback } from "react";
import { IconContext } from "react-icons";
import { RiMapPinLine } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEvaluate } from "src/hook/Evaluate";
import { Info } from "src/types/info";
import { useEthers } from "@usedapp/core";

type Regist = {
  info: Info | undefined;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

export const AddStar: FC<Regist> = (props) => {
  const { account } = useEthers();
  const { loading, success, error, send } = useEvaluate();
  const { info, opened, setOpened } = props;
  const [show, setShow] = useState<boolean>(false);
  const [hover, setHover] = useState<number>(-1);
  const [selected, setSelected] = useState<number>(0);
  const handleSubmit = useCallback(
    async (info: Info | undefined) => {
      if (info == undefined) return;
      await send(info.id, selected);
    },
    [info, selected]
  );
  const handleOpened = useCallback(() => {
    setOpened(false);
    setShow(false);
  }, [show, opened]);
  const handleClick = useCallback((num: number) => {
    setSelected(num);
    setHover(-1);
  }, []);
  const handleHover = useCallback((num: number) => {
    setHover(num);
  }, []);
  useEffect(() => {
    if (success) {
      setOpened(false);
    }
  }, [success]);

  return (
    <Dialog
      opened={opened}
      withCloseButton
      onClose={() => setOpened(false)}
      size="lg"
      radius={0}
      position={{ left: "20px", bottom: "20px" }}
      className="pt-8 rounded-br-3xl rounded-bl-3xl"
    >
      <div className="absolute top-0 left-0 -translate-y-full w-full h-[150px] rounded-tr-3xl rounded-tl-3xl bg-gradient-to-r from-cyan-500 to-blue-500"></div>
      <h3 className="text-xl font-bold">{info?.name}</h3>
      <p className="text-sm underline decoration-1 leading-none">
        {info?.category}
      </p>
      <dl className="flex flex-wrap w-full justify-between mt-2 pb-4 border-b border-[#e0dccc]">
        <dt className="w-[30px] h-[22px] mt-3">
          <IconContext.Provider value={{ size: "20px" }}>
            <RiMapPinLine />
          </IconContext.Provider>
        </dt>
        <dd className="w-[calc(100%-30px)] underline decoration-1 mt-3 leading-none">
          {info?.address}
        </dd>
      </dl>
      <div className="flex justify-center flex-wrap mt-3">
        <p className="text-4xl text-[#DA382F] w-full text-center">
          {info?.star}/5
        </p>
        <div className="relative w-[5em] h-[1em] text-3xl leading-[1em] mt-1">
          <div
            className="absolute top-0 left-0 overflow-hidden whitespace-nowrap text-[#DA382F]"
            style={{ width: `${info?.star}em` }}
          >
            ★★★★★
          </div>
          <div className="text-[#aeaeae]">☆☆☆☆☆</div>
        </div>
      </div>
      {account ? (
        <button
          className="w-full text-base text-left text-[#DA382F] p-3 mt-4 relative"
          onClick={() => setShow(!show)}
        >
          評価を行う
          <span className="absolute top-1/2 right-0 -translate-y-1/2">
            {show ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </span>
        </button>
      ) : (
        <p className="w-full text-base text-left text-[#DA382F] p-3 mt-4">
          ウォレットを接続してください
        </p>
      )}
      {show && (
        <div>
          <div className="relative w-[5em] h-[1em] text-3xl leading-[1em]">
            <div className="absolute top-0 left-0 overflow-hidden whitespace-nowrap text-[#DA382F] w-[5em]">
              {[...Array(5)]
                .map((_, i) => i + 1)
                .map((num: number) => (
                  <span
                    key={num}
                    className={
                      num <= selected || num <= hover
                        ? "opacity-100 cursor-pointer"
                        : "opacity-0 hover:opacity-100 cursor-pointer"
                    }
                    onClick={() => handleClick(num)}
                    onMouseOver={() => handleHover(num)}
                    onMouseLeave={() => setHover(-1)}
                  >
                    ★
                  </span>
                ))}
            </div>
            <div className="text-[#aeaeae]">☆☆☆☆☆</div>
          </div>
          <div className="flex justify-around mt-5">
            <Button
              className="flex w-[calc(50%-10px)] h-[40px] justify-center items-center text-sm font-bold text-[#333] border border-[#333] hover:bg-inherit"
              onClick={() => handleOpened()}
            >
              CANCEL
            </Button>
            <Button
              loading={loading}
              radius={0}
              onClick={() => handleSubmit(info)}
              className="flex w-[calc(50%-10px)] h-[40px] justify-center items-center text-sm font-bold bg-[#333] text-white hover:bg-[#333]"
            >
              EVALUATE
            </Button>
          </div>
        </div>
      )}
    </Dialog>
  );
};
