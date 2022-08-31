import { Button, Dialog, Modal } from "@mantine/core";
import { useEthers } from "@usedapp/core";
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IconContext } from "react-icons";
import { RiMapPinLine } from "react-icons/ri";
import { useAuth } from "src/context/auth";
import { useRating } from "src/hook/Rating";
import { addList } from "src/lib/firebase/evaluate";
import { Info } from "src/types/info";

type Regist = {
  info: Info | undefined;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

export const AddStar: FC<Regist> = (props) => {
  const { account } = useEthers();
  const { loading, success, error, send } = useRating();
  const { info, opened, setOpened } = props;
  const [show, setShow] = useState<boolean>(false);
  const [hover, setHover] = useState<number>(-1);
  const [selected, setSelected] = useState<number>(0);
  const { fbUser } = useAuth();
  const handleSubmit = useCallback(
    async (info: Info | undefined) => {
      if (info == undefined) return;
      await send(info.id, selected);
      addList({
        user: fbUser,
        name: info.name,
        category: info.category,
        address: info.address,
        star: selected,
      });
    },
    [info, selected]
  );
  const handleCanceled = useCallback(() => {
    setShow(false);
    setSelected(0);
  }, []);
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
      className="pt-8 rounded-xl z-10"
    >
      <div className="tag absolute right-8 top-0 w-10 h-12 bg-[#2cb696] text-lg text-white font-bold leading-none flex items-center justify-center text-center">
        ★<br />
        {info?.star}
      </div>
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
      {account ? (
        <button
          className="w-full flex items-center rounded-md justify-center font-medium text-white bg-[#2cb696] p-3 mt-4 relative"
          onClick={() => setShow(!show)}
        >
          このお店を評価する
        </button>
      ) : (
        <p className="w-full text-base text-left text-[#fe553e] p-3 mt-4">
          ウォレットを接続してください
        </p>
      )}
      <Modal
        opened={show}
        onClose={() => handleCanceled()}
        title="Star Rating"
        centered
        className="text-lg font-medium"
      >
        <p className="text-xl font-bold ">{info?.name}</p>
        <p className="flex flex-wrap w-full items-center text-sm leading-none mt-2">
          <IconContext.Provider value={{ size: "18px" }}>
            <RiMapPinLine />
          </IconContext.Provider>
          {info?.address}
        </p>
        <div className="relative w-[5em] h-[1em] text-3xl leading-[1em] mt-3">
          <div className="absolute top-0 left-0 overflow-hidden whitespace-nowrap text-[#fe553e] w-[5em]">
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
            className="flex w-[calc(50%-10px)] h-[40px] justify-center items-center text-sm font-bold rounded-none text-black border border-black hover:bg-inherit"
            onClick={() => handleCanceled()}
          >
            CANCEL
          </Button>
          <Button
            loading={loading}
            radius={0}
            onClick={() => handleSubmit(info)}
            className="flex w-[calc(50%-10px)] h-[40px] justify-center items-center text-sm font-bold bg-black text-white hover:bg-black"
          >
            SUBMIT
          </Button>
        </div>
      </Modal>
    </Dialog>
  );
};
