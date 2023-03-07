import {Button} from '@mantine/core'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import {FcGoogle} from 'react-icons/fc'
import {ResponsiveTxt} from 'src/component/ResponsiveTxt'
import {useAuth} from 'src/context/auth'
import {useMetamask} from 'src/context/metamask'
import {login} from 'src/lib/firebase/auth'

const LoginPage = () => {
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
  if (isLoading || user || fbUser || !hasMetamask) {
    return <div className='loading'></div>
  }
  return (
    <main>
      <ResponsiveTxt />
      <div className='hidden md:block max-w-xl mx-auto pt-20'>
        <h1 className='text-2xl text-center font-bold'>ログイン</h1>
        <Button
          leftIcon={<FcGoogle />}
          className='w-full text-lg text-black border-2 border-[#efefef] h-14 hover:bg-[#efefef] mt-10'
          onClick={login}
        >
          Google
        </Button>
      </div>
    </main>
  )
}

export default LoginPage
