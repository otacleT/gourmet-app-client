import {Group, Text} from '@mantine/core'
import {Goerli, useEthers} from '@usedapp/core'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {FC} from 'react'

/**
 * @package
 */
export const WalletConnect: FC = () => {
  const {account, activateBrowserWallet, chainId, deactivate, switchNetwork} = useEthers()
  const router = useRouter()
  if (router.route === '/') {
    return (
      <Link
        className='text-sm leading-none cursor-pointer font-bold text-white bg-[#2cb696] p-3 mr-5 rounded-md'
        href='/map'
      >
        マップに戻る
      </Link>
    )
  }
  if (account) {
    if (chainId === Goerli.chainId) {
      return (
        <button
          onClick={deactivate}
          className='text-sm leading-none cursor-pointer font-bold text-white bg-[#2cb696] py-3 px-4 mr-5 rounded-md'
        >
          ウォレット接続を解除
        </button>
      )
    } else {
      return (
        <Group>
          <Text className='text-sm' color='red'>
            ネットワークが違います
          </Text>
          <button
            onClick={() => switchNetwork(Goerli.chainId)}
            className='text-sm leading-none cursor-pointer font-bold text-white bg-[#2cb696] py-3 px-4 mr-5 rounded-md'
          >
            ネットワークを切り替える
          </button>
        </Group>
      )
    }
  } else {
    return (
      <button
        className='text-sm leading-none cursor-pointer font-bold text-white bg-[#2cb696] py-3 px-4 mr-5 rounded-md'
        onClick={activateBrowserWallet}
      >
        ウォレットを接続
      </button>
    )
  }
}
