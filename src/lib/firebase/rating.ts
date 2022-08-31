import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./init";

export type Item = {
  user: User | null | undefined;
  name: string;
  category: string;
  address: string;
  star: number;
};

export async function addRating(item: Item): Promise<void> {
  const addId = Math.round(Math.random() * 10000000000);
  if (!item.user) return;
  const ref = doc(db, `users/${item.user.uid}/list`, String(addId));
  await setDoc(ref, {
    name: item.name,
    category: item.category,
    address: item.address,
    star: item.star,
  });
}
