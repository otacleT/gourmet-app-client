import {Button, Modal} from '@mantine/core'
import {showNotification} from '@mantine/notifications'
import {Dispatch, FC, SetStateAction, useCallback, useEffect, useState} from 'react'
import {IconContext} from 'react-icons'
import {AiOutlineCheck} from 'react-icons/ai'
import {IoCloseOutline} from 'react-icons/io5'
import {RiMapPinLine} from 'react-icons/ri'
import {useAuth} from 'src/context/auth'
import {useRating} from 'src/hook/useRating'
import {addRating} from 'src/lib/firebase/rating'
import {Info} from 'src/types/info'

import {StarRating} from '../StarRating'

type Props = {
  info: Info | undefined
  setOpened: Dispatch<SetStateAction<boolean>>
  setShow: Dispatch<SetStateAction<boolean>>
  show: boolean
}

/**
 * @package
 */
export const RateModal: FC<Props> = (props) => {
  const {info, setOpened, setShow, show} = props
  const {error, loading, send, success} = useRating()
  const [selected, setSelected] = useState<number>(0)
  const {fbUser, point} = useAuth()
  const handleSubmit = useCallback(
    async (info: Info | undefined) => {
      if (info == undefined) return
      await send(info.id, selected, point)
      addRating({
        name: info.name,
        address: info.address,
        category: info.category,
        star: selected,
        user: fbUser,
      })
    },
    [selected, send, fbUser, point]
  )
  const handleCanceled = useCallback(() => {
    setShow(false)
    setSelected(0)
  }, [setShow, setSelected])

  useEffect(() => {
    if (success) {
      setShow(false)
      setOpened(false)
      setSelected(0)
      showNotification({
        icon: <AiOutlineCheck />,
        message: `${info?.name}への評価が正常に処理されました`,
      })
    } else if (error) {
      setShow(false)
      setOpened(false)
      setSelected(0)
      showNotification({
        color: 'red',
        icon: <IoCloseOutline />,
        message: '問題が発生しました',
      })
    }
  }, [success, error, info, setShow, setOpened])

  return (
    <Modal
      opened={show}
      onClose={() => handleCanceled()}
      withCloseButton={false}
      centered
      className='text-lg'
    >
      <p className='text-xl font-bold '>{info?.name}</p>
      <p className='flex flex-wrap w-full items-center text-sm leading-none mt-2'>
        <IconContext.Provider value={{size: '18px'}}>
          <RiMapPinLine />
        </IconContext.Provider>
        {info?.address}
      </p>
      <StarRating selected={selected} setSelected={setSelected} />
      <div className='flex justify-around mt-5'>
        <Button
          className='flex w-[calc(50%-10px)] h-[40px] justify-center items-center text-sm font-bold rounded-md text-[#2cb696] border border-[#2cb696] hover:bg-inherit'
          onClick={() => handleCanceled()}
        >
          閉じる
        </Button>
        <Button
          loading={loading}
          radius={0}
          onClick={() => handleSubmit(info)}
          className='flex w-[calc(50%-10px)] h-[40px] justify-center items-center text-sm font-bold rounded-md text-white bg-[#2cb696] hover:bg-[#2cb696]'
        >
          評価を行う
        </Button>
      </div>
    </Modal>
  )
}
