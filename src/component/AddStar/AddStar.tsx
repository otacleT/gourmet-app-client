import { Button, Dialog } from "@mantine/core";
import { ChangeEventHandler, SetStateAction, useState } from "react";
import { Dispatch, FC } from "react";
import { useCallback } from "react";
import { IconContext } from "react-icons";
import { RiMapPinLine } from "react-icons/ri";
import { useEvaluate } from "src/hook/Evaluate";
import { Info } from "src/types/info";

type Regist = {
  info: Info | undefined;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

export const AddStar: FC<Regist> = (props) => {
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

  return (
    <Dialog
      opened={opened}
      withCloseButton
      onClose={() => setOpened(false)}
      size="lg"
      radius={0}
      position={{ left: "20px", bottom: "20px" }}
    >
      <div className="absolute top-0 left-0 -translate-y-full w-full h-[200px] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
      <h3 className="text-xl font-bold">{info?.name}</h3>
      <p className="text-sm">{info?.category}</p>
      <div className="relative w-[5em] h-[1em] text-3xl leading-[1em]">
        <div
          className="absolute top-0 left-0 overflow-hidden whitespace-nowrap text-[#c9171e]"
          style={{ width: `${info?.star}em` }}
        >
          ★★★★★
        </div>
        <div className="text-[#aeaeae]">☆☆☆☆☆</div>
      </div>
      <dl className="flex flex-wrap w-full items-start justify-between mt-3">
        <dt className="w-[30px] h-[22px]">
          <IconContext.Provider value={{ size: "20px" }}>
            <RiMapPinLine />
          </IconContext.Provider>
        </dt>
        <dd className="w-[calc(100%-30px)] text-base leading-snug">
          〒{info?.address}
        </dd>
      </dl>
      <button onClick={() => setShow(true)}>評価をおこなう</button>
      {show && (
        <div>
          <div className="relative w-[5em] h-[1em] text-3xl leading-[1em]">
            <div className="absolute top-0 left-0 overflow-hidden whitespace-nowrap text-[#c9171e] w-[5em]">
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
