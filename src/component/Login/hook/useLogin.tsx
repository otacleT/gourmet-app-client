import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {useAuth} from 'src/context/auth'
import {useMetamask} from 'src/context/metamask'

export const useLogin = () => {
  const {fbUser, isLoading, user} = useAuth()
  const router = useRouter()
  const {hasMetamask, isStarting} = useMetamask()

  useEffect(() => {
    if (!isStarting && !hasMetamask) {
      router.push('/')
    }
    if (fbUser) {
      router.push('/create-account')
    }
    if (user) {
      router.push('/map')
    }
  }, [user, fbUser, hasMetamask, isStarting, router])

  return {
    fbUser,
    hasMetamask,
    isLoading,
    user,
  }
}
