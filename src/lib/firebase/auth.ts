import { GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth } from "./init";

export const login = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider);
};
export const logout = async () => {
  return signOut(auth).then(() => {
    toast.success("ログアウトしました");
  });
};
