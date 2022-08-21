import { collection, getDocs, getFirestore } from "firebase/firestore";

export type Shop = {
  id: number;
  name: string;
  category: string;
  postcode: string;
  address: string;
  latitude: number;
  longitude: number;
};

export async function getShops(): Promise<Shop[]> {
  const shops = new Array<Shop>();
  const db = getFirestore();
  const shopsSnapshot = await getDocs(collection(db, "/shops"));

  shopsSnapshot.forEach((doc) => {
    const shop = doc.data() as Shop;
    shops.push({ ...shop, id: Number(doc.id) });
  });

  return shops;
}
