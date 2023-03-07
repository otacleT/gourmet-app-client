import {Dialog} from '@mantine/core'
import {useEthers} from '@usedapp/core'
import Image from 'next/image'
import {Dispatch, FC, SetStateAction, useState} from 'react'
import {IconContext} from 'react-icons'
import {RiMapPinLine} from 'react-icons/ri'
import {Info} from 'src/types/info'

import {RateModal} from '../RateModal'

type Props = {
  info: Info | undefined
  opened: boolean
  setOpened: Dispatch<SetStateAction<boolean>>
}

export const ShopInfo: FC<Props> = (props) => {
  const {account} = useEthers()
  const {info, opened, setOpened} = props
  const [show, setShow] = useState<boolean>(false)

  return (
    <div>
      <Dialog
        opened={opened}
        withCloseButton
        onClose={() => setOpened(false)}
        size='lg'
        radius={0}
        position={{bottom: '20px', left: '20px'}}
        zIndex={100}
        className='hidden md:block pt-8 rounded-bl-xl rounded-br-xl'
      >
        <div className='absolute top-0 left-0 -translate-y-full w-full h-[200px] overflow-hidden rounded-tl-xl rounded-tr-xl'>
          <Image
            className='object-cover'
            src='/cooking.jpg'
            alt='食べ物の画像'
            fill
            sizes='400px'
          />
        </div>
        <div className='tag absolute right-8 top-0 w-10 h-12 bg-[#2cb696] text-lg text-white font-bold leading-none flex items-center justify-center text-center'>
          ★<br />
          {info?.star}
        </div>
        <h3 className='text-xl font-bold'>{info?.name}</h3>
        <p className='text-sm underline decoration-1 leading-none'>{info?.category}</p>
        <dl className='flex flex-wrap w-full justify-between mt-2 pb-4 border-b border-[#e0dccc]'>
          <dt className='w-[30px] h-[22px] mt-3'>
            <IconContext.Provider value={{size: '20px'}}>
              <RiMapPinLine />
            </IconContext.Provider>
          </dt>
          <dd className='w-[calc(100%-30px)] underline decoration-1 mt-3 leading-none'>
            {info?.address}
          </dd>
        </dl>
        {account ? (
          <button
            className='w-full flex items-center rounded-md justify-center font-bold leading-none text-white bg-[#2cb696] p-3 mt-4 relative'
            onClick={() => setShow(!show)}
          >
            このお店を評価する
          </button>
        ) : (
          <p className='w-full text-base text-[#fe553e] font-bold text-center p-3 mt-4'>
            ウォレットを接続してください
          </p>
        )}
      </Dialog>
      <RateModal info={info} show={show} setOpened={setOpened} setShow={setShow} />
    </div>
  )
}
