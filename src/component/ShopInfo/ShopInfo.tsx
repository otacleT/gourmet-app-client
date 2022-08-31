import { Dialog } from "@mantine/core";
import { useEthers } from "@usedapp/core";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { IconContext } from "react-icons";
import { RiMapPinLine } from "react-icons/ri";
import { Info } from "src/types/info";
import { RateModal } from "../RateModal";

type Props = {
  info: Info | undefined;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

export const ShopInfo: FC<Props> = (props) => {
  const { account } = useEthers();
  const { info, opened, setOpened } = props;
  const [show, setShow] = useState<boolean>(false);

  return (
    <div>
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
      </Dialog>
      <RateModal info={info} show={show} setShow={setShow} />
    </div>
  );
};
