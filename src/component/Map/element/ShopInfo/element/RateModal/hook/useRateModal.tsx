import {showNotification} from '@mantine/notifications'
import {Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react'
import {AiOutlineCheck} from 'react-icons/ai'
import {IoCloseOutline} from 'react-icons/io5'
import {useAuth} from 'src/context/auth'
import {useRating} from 'src/hook/useRating'
import {addRating} from 'src/lib/firebase/rating'
import {Info} from 'src/type/info'

export const useRateModal = (
  info: Info | undefined,
  setShow: Dispatch<SetStateAction<boolean>>,
  setOpened: Dispatch<SetStateAction<boolean>>
) => {
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
  }, [setSelected, setShow])

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

  return {
    error,
    handleCanceled,
    handleSubmit,
    loading,
    selected,
    setSelected,
    success,
  }
}
