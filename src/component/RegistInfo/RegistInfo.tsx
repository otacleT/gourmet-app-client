import { Button, Dialog } from "@mantine/core";
import { SetStateAction } from "react";
import { Dispatch, FC } from "react";
import { useCallback } from "react";
import { IconContext } from "react-icons";
import { RiMapPinLine } from "react-icons/ri";
import { useAddMap } from "src/hook/AddMap";
import { Info } from "src/pages";

type Regist = {
  info: Info;
  regist: boolean;
  setRegist: Dispatch<SetStateAction<boolean>>;
};

export const RegistInfo: FC<Regist> = (props) => {
  const { loading, success, error, send } = useAddMap();
  const { info, regist, setRegist } = props;
  const handleSubmit = useCallback(
    async (info: Info) => {
      await send(
        info.name,
        Math.round(info.latitude * 100000),
        Math.round(info.longitude * 100000),
        3
      );
    },
    [info]
  );
  return (
    <Dialog
      opened={regist}
      withCloseButton
      onClose={() => setRegist(false)}
      size="lg"
      radius={0}
      position={{ left: "20px", bottom: "20px" }}
    >
      <div className="absolute top-0 left-0 -translate-y-full w-full h-[200px] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
      <h3 className="text-xl font-bold">{info.name}</h3>
      <p className="text-sm">{info.category}</p>
      <dl className="flex flex-wrap w-full items-start justify-between mt-3">
        <dt className="w-[30px] h-[22px]">
          <IconContext.Provider value={{ size: "20px" }}>
            <RiMapPinLine />
          </IconContext.Provider>
        </dt>
        <dd className="w-[calc(100%-30px)] text-base leading-snug">
          〒{info.address}
        </dd>
      </dl>
      <div className="flex justify-around mt-5">
        <Button
          className="flex w-[calc(50%-10px)] h-[40px] justify-center items-center text-sm font-bold text-[#333] border border-[#333] hover:bg-inherit"
          onClick={() => setRegist(false)}
        >
          CANCEL
        </Button>
        <Button
          loading={loading}
          radius={0}
          onClick={() => handleSubmit(info)}
          className="flex w-[calc(50%-10px)] h-[40px] justify-center items-center text-sm font-bold bg-[#333] text-white hover:bg-[#333]"
        >
          REGISTER
        </Button>
      </div>
    </Dialog>
  );
};
