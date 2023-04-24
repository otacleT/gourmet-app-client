import {Button, Modal} from '@mantine/core'
import {Dispatch, FC, SetStateAction} from 'react'
import {IconContext} from 'react-icons'
import {RiMapPinLine} from 'react-icons/ri'
import {Info} from 'src/type/info'

import {StarRating} from '../StarRating'
import {useRateModal} from './hook/useRateModal'

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
  const {handleCanceled, handleSubmit, loading, selected, setSelected} = useRateModal(
    info,
    setShow,
    setOpened
  )

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
