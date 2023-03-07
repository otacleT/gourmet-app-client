import Link from 'next/link'
import {FC, useState} from 'react'
import {useMetamask} from 'src/context/metamask'

import {DrawerMenu} from './DrawerMenu'
import {HeaderButton} from './HeaderButton'
import {UserIcon} from './UserIcon'

/**
 * @package
 */
export const Header: FC = () => {
  const [isMypage, setIsMypage] = useState<boolean>(false)
  const {hasMetamask} = useMetamask()

  return (
    <header className='w-full'>
      <div className='max-w-6xl mx-auto h-[70px] px-5 flex justify-between items-center'>
        <Link className='text-2xl font-bold' href='/'>
          Gourmet APP
        </Link>
        {hasMetamask && (
          <div className='hidden md:flex justify-between items-center'>
            <HeaderButton />
            <UserIcon setIsMypage={setIsMypage} />
          </div>
        )}
      </div>
      <DrawerMenu isMypage={isMypage} setIsMypage={setIsMypage} />
    </header>
  )
}
