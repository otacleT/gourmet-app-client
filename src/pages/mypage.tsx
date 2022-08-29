import { Image } from "@mantine/core";
import React from "react";
import { useAuth } from "src/context/auth";
import { useHistory } from "src/hook/History";

const Mypage = () => {
  const { user, fbUser } = useAuth();
  const { history } = useHistory();
  console.log(history);

  return (
    <div>
      Mypage
      <div>
        {fbUser?.photoURL !== null && (
          <Image height={100} width={100} src={fbUser?.photoURL} />
        )}
      </div>
      <h1>{user?.nickname}</h1>
      <p>{user?.address}</p>
      <p>{user?.sex}</p>
      <p>{user?.birth}</p>
      {history.map((item) => (
        <div key={Math.round(Math.random() * 10000)}>
          {item.name}
          {item.address}
          {item.category}
          {item.star}
        </div>
      ))}
    </div>
  );
};

export default Mypage;
