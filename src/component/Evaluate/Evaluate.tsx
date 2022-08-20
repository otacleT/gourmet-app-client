import { Drawer } from "@mantine/core";
import { Dispatch, FC, SetStateAction } from "react";
import { Eval } from "src/pages";

type Ev = {
  ev: Eval;
  elt: boolean;
  setElt: Dispatch<SetStateAction<boolean>>;
};

export const Evaluate: FC<Ev> = (props) => {
  const { ev, elt, setElt } = props;
  return (
    <Drawer
      opened={elt}
      onClose={() => setElt(false)}
      title="評価を行う"
      padding="xl"
      size="lg"
      overlayOpacity={0.1}
      position="right"
      className="h-[calc(100vh-70px)] top-auto bottom-0"
    >
      <h3>{ev?.name}</h3>
      <ul>
        <li>{ev?.latitude}</li>
        <li>{ev?.longitude}</li>
      </ul>
    </Drawer>
  );
};
