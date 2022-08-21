import { Drawer } from "@mantine/core";
import { Dispatch, FC, SetStateAction } from "react";
import { Info } from "src/pages";

type Props = {
  info: Info | undefined;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

export const Marked: FC<Props> = (props) => {
  const { info, opened, setOpened } = props;
  return (
    <Drawer
      opened={opened}
      onClose={() => setOpened(false)}
      title={info?.name}
      padding="xl"
      size="lg"
      overlayOpacity={0.1}
      position="right"
      className="h-[calc(100vh-70px)] top-auto bottom-0"
    >
      <p>{info?.category}</p>
      <p>{info?.address}</p>
      <div className="flex items-center justify-center rounded-sm bg-[#efefef] py-5 px-3">
        <p className="text-2xl mr-4 leading-[1em] text-[#c9171e]">4.4/5</p>
        <div className="relative w-[5em] h-[1em] text-3xl leading-[1em]">
          <div className="absolute top-0 left-0 overflow-hidden whitespace-nowrap text-[#c9171e] w-[1.4em]">
            ★★★★★
          </div>
          <div className="text-[#aeaeae]">☆☆☆☆☆</div>
        </div>
      </div>
      <ul>
        <li>{info?.latitude}</li>
        <li>{info?.longitude}</li>
      </ul>
    </Drawer>
  );
};
