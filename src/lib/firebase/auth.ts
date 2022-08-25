import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./init";

export const login = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider)
    .then((result) => {
      alert(`${result.user.displayName}さんこんにちは`);
    })
    .catch((e) => console.log(e));
};
export const logout = () => {
  return signOut(auth).then(() => {
    alert("サインアウト完了");
  });
};
