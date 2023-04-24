import {useForm} from '@mantine/form'
import {showNotification} from '@mantine/notifications'
import {doc, setDoc} from 'firebase/firestore'
import {useRouter} from 'next/router'
import {useCallback, useEffect} from 'react'
import {AiOutlineCheck} from 'react-icons/ai'
import {useAuth} from 'src/context/auth'
import {useMetamask} from 'src/context/metamask'
import {db} from 'src/lib/firebase/init'

export const useCreateAccount = () => {
  const {fbUser, isLoading, user} = useAuth()
  const router = useRouter()
  const {hasMetamask, isStarting} = useMetamask()
  const form = useForm({
    initialValues: {
      name: '',
      address: '',
      birth: '',
      job: '',
      nickname: '',
      sex: '',
    },
  })

  const handleSubmit = useCallback(
    async (values: typeof form.values) => {
      if (!fbUser) return
      const ref = doc(db, `users/${fbUser.uid}`)
      setDoc(ref, {...values})
      showNotification({
        icon: <AiOutlineCheck />,
        message: 'アカウント情報を保存しました',
      })
    },
    [fbUser, form]
  )

  useEffect(() => {
    if (!isStarting && !hasMetamask) {
      router.push('/')
    }
    if (!fbUser) {
      router.push('/login')
    }
    if (user) {
      router.push('/map')
    }
  }, [fbUser, user, hasMetamask, isStarting, router])

  return {
    fbUser,
    form,
    handleSubmit,
    hasMetamask,
    isLoading,
    user,
  }
}
