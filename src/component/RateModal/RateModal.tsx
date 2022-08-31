import { Button, Modal } from "@mantine/core";
import { Dispatch, FC, SetStateAction, useCallback, useState } from "react";
import { IconContext } from "react-icons";
import { RiMapPinLine } from "react-icons/ri";
import { useAuth } from "src/context/auth";
import { useRating } from "src/hook/Rating";
import { addRating } from "src/lib/firebase/rating";
import { Info } from "src/types/info";
import { StarRating } from "../StarRating";

type Props = {
  info: Info | undefined;
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
};

export const RateModal: FC<Props> = (props) => {
  const { info, show, setShow } = props;
  const { loading, success, error, send } = useRating();
  const [hover, setHover] = useState<number>(-1);
  const [selected, setSelected] = useState<number>(0);
  const { fbUser } = useAuth();
  const handleSubmit = useCallback(
    async (info: Info | undefined) => {
      if (info == undefined) return;
      await send(info.id, selected);
      addRating({
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
  return (
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
      <StarRating />
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
  );
};
