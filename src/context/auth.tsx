import {
  onAuthStateChanged,
  Unsubscribe,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "src/lib/firebase/init";
import { User } from "src/types/user";

type ContextType = {
  fbUser: FirebaseUser | null | undefined;
  isLoading: boolean;
  user: User | null | undefined;
  point: number;
};

const AuthContext = createContext<ContextType>({
  fbUser: undefined,
  isLoading: true,
  user: undefined,
  point: 0,
});
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [fbUser, setFbUser] = useState<FirebaseUser | null>();
  const [point, setPoint] = useState<number>(0);

  useEffect(() => {
    let unsubribe: Unsubscribe;

    onAuthStateChanged(auth, (resultUser) => {
      unsubribe?.();
      setFbUser(resultUser);

      if (resultUser) {
        setIsLoading(true);
        const ref = doc(db, `users/${resultUser.uid}`);
        unsubribe = onSnapshot(ref, (snap) => {
          setUser(snap.data() as User);
          setIsLoading(false);
        });
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
  }, []);
  useEffect(() => {
    if (!user) return;
    for (const [key, value] of Object.entries(user)) {
      if (key == "nickname") {
        setPoint((prevpoint) => {
          return prevpoint + 50;
        });
      } else if (value != "") {
        setPoint((prevpoint) => {
          return prevpoint + 10;
        });
      }
    }
  }, [user]);
  return (
    <AuthContext.Provider
      value={{
        fbUser,
        isLoading,
        user,
        point,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
