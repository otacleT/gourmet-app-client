import Link from 'next/link'
import {WalletConnect} from 'src/component/WalletConnect'
import {useAuth} from 'src/context/auth'

/**
 * @package
 */
export const HeaderButton = () => {
  const {fbUser, user} = useAuth()
  if (fbUser && user) {
    return <WalletConnect />
  } else if (!fbUser) {
    return (
      <Link
        className='text-sm leading-none cursor-pointer font-bold text-white bg-[#2cb696] p-3 mr-5 rounded-md'
        href='/login'
      >
        ログイン
      </Link>
    )
  } else {
    return (
      <Link
        className='text-sm leading-none cursor-pointer font-bold text-white bg-[#2cb696] p-3 mr-5 rounded-md'
        href='/create-account'
      >
        アカウント作成
      </Link>
    )
  }
}
