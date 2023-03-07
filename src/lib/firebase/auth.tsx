import {showNotification} from '@mantine/notifications'
import {GoogleAuthProvider, signInWithRedirect, signOut} from 'firebase/auth'
import {AiOutlineCheck} from 'react-icons/ai'

import {auth} from './init'

export const login = async () => {
  const provider = new GoogleAuthProvider()
  return signInWithRedirect(auth, provider)
}
export const logout = async () => {
  return signOut(auth).then(() => {
    showNotification({
      icon: <AiOutlineCheck />,
      message: 'ログアウトしました',
    })
  })
}
