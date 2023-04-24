import {User} from 'firebase/auth'
import {doc, setDoc} from 'firebase/firestore'

import {db} from './init'

export type Item = {
  name: string
  address: string
  category: string
  star: number
  user: User | null | undefined
}

export async function addRating(item: Item): Promise<void> {
  const addId = Math.round(Math.random() * 10000000000)
  if (!item.user) return
  const ref = doc(db, `users/${item.user.uid}/list`, String(addId))
  await setDoc(ref, {
    name: item.name,
    address: item.address,
    category: item.category,
    star: item.star,
  })
}
