import { useEthers } from "@usedapp/core";
import { NextPage } from "next";
import { useAddMap } from "../hook/AddMap";
import { useMap } from "../hook/Map/Map";

const Test: NextPage = () => {
  const { activateBrowserWallet, account } = useEthers();
  const { maps } = useMap();
  const { loading, success, error, send } = useAddMap();
  const handleSubmit = async () => {
    await send("Taisei", 20, 30, 5);
  };
  return (
    <div>
      {account ? (
        <div>
          <p>Account: {account}</p>
          <button onClick={() => handleSubmit()}>TEST</button>
        </div>
      ) : (
        <button onClick={activateBrowserWallet}> Connect </button>
      )}
      {maps.map((item, index) => (
        <div key={index}>
          <p>{item.name}</p>
          <p>{String(item.latitude)}</p>
          <p>{String(item.longitude)}</p>
          <p>{String(item.star)}</p>
        </div>
      ))}
    </div>
  );
};

export default Test;
