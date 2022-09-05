import { User as FirebaseUser } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { User } from "src/types/user";
import { db } from "./init";

export async function editProfile(
  edit: User,
  fbUser: FirebaseUser | null | undefined
): Promise<void> {
  const docRef = doc(db, "users/", String(fbUser?.uid));
  await setDoc(
    docRef,
    {
      name: edit?.name,
      sex: edit?.sex,
      birth: edit?.birth,
      address: edit?.address,
      job: edit?.job,
    },
    { merge: true }
  );
}
