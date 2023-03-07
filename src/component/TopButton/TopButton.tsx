import Link from 'next/link'
import {FC} from 'react'
import {useAuth} from 'src/context/auth'

export const TopButton: FC = () => {
  const {fbUser, user} = useAuth()
  if (fbUser && user) {
    return (
      <Link
        className='text-lg font-bold text-white text-center py-3 px-6 rounded-md bg-[#2cb696] mr-10'
        href='/map'
      >
        マップに戻る
      </Link>
    )
  } else if (!fbUser) {
    return (
      <Link
        className='text-lg font-bold text-white text-center py-3 px-6 rounded-md bg-[#2cb696] mr-10'
        href='/login'
      >
        ログインして始める
      </Link>
    )
  } else {
    return (
      <Link
        className='text-lg font-bold text-white text-center py-3 px-6 rounded-md bg-[#2cb696] mr-10'
        href='/create-account'
      >
        アカウントを作成する
      </Link>
    )
  }
}
