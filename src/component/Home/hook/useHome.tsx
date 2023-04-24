import {showNotification} from '@mantine/notifications'
import {useEffect} from 'react'
import {IoCloseOutline} from 'react-icons/io5'
import {useMetamask} from 'src/context/metamask'

export const useHome = () => {
  const {hasMetamask, isStarting} = useMetamask()

  useEffect(() => {
    if (!isStarting && !hasMetamask) {
      showNotification({
        color: 'red',
        icon: <IoCloseOutline />,
        message: 'ブラウザにMetamaskがインストールされていません',
      })
    }
  }, [hasMetamask, isStarting])

  return {
    hasMetamask,
    isStarting,
  }
}
