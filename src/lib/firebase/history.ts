import { User } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { Item } from "./evaluate";

export async function getHistory(
  user: User | null | undefined
): Promise<Item[]> {
  const list = new Array<Item>();
  const db = getFirestore();
  const shopsSnapshot = await getDocs(
    collection(db, `users/${user?.uid}/list`)
  );

  shopsSnapshot.forEach((doc) => {
    const item = doc.data() as Item;
    list.push({ ...item });
  });

  return list;
}
