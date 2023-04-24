import {Button} from '@mantine/core'
import {FC} from 'react'
import {FcGoogle} from 'react-icons/fc'
import {login} from 'src/lib/firebase/auth'

import {ResponsiveTxt} from '../common/ResponsiveTxt'
import {useLogin} from './hook/useLogin'

/**
 * @package
 */
export const Login: FC = () => {
  const {fbUser, hasMetamask, isLoading, user} = useLogin()

  if (isLoading || user || fbUser || !hasMetamask) {
    return <div className='loading'></div>
  }

  return (
    <>
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
    </>
  )
}
