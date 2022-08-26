import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { auth } from "./init";

export const login = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider);
};
export const logout = async () => {
  return signOut(auth).then(() => {
    alert("サインアウト完了");
  });
};
