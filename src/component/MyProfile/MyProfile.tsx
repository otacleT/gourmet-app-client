import {Drawer, Image} from '@mantine/core'
import {Dispatch, FC, SetStateAction, useCallback, useState} from 'react'
import {IconContext} from 'react-icons'
import {MdFace} from 'react-icons/md'
import {useAuth} from 'src/context/auth'
import {useHistory} from 'src/hook/History'

import {DisplayProfile} from '../DisplayProfile'
import {EditProfile} from '../EditProfile'

type Props = {
  isMypage: boolean
  setIsMypage: Dispatch<SetStateAction<boolean>>
}

export const MyProfile: FC<Props> = (props) => {
  const {isMypage, setIsMypage} = props
  const {fbUser, point, user} = useAuth()
  const {history} = useHistory()
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const handleClose = useCallback(() => {
    setIsMypage(false)
    setIsEdit(false)
  }, [setIsMypage, setIsEdit])

  return (
    <Drawer
      opened={isMypage}
      onClose={() => handleClose()}
      position='right'
      overlayOpacity={0.55}
      overlayBlur={3}
      withCloseButton={false}
      size='420px'
      className='hidden md:block scrollBar h-[calc(100vh-70px)] top-auto bottom-0 p-10 overflow-y-scroll'
    >
      <div className='w-full flex justify-between'>
        {fbUser?.photoURL ? (
          <Image
            height={100}
            width={100}
            src={fbUser?.photoURL}
            className='rounded-full overflow-hidden'
          />
        ) : (
          <div className='w-[100px] h-[100px] rounded-full flex content-center justify-center flex-wrap border-2 border-[#f6f8fa]'>
            <IconContext.Provider value={{size: '28px'}}>
              <MdFace />
            </IconContext.Provider>
            <span className='w-full text-xs font-medium text-center'>NO IMAGE</span>
          </div>
        )}
        <div className='w-[calc(100%-115px)]'>
          <p className='text-xl font-bold'>{user?.nickname}</p>
          <p className='text-sm'>{fbUser?.email}</p>
          <div className='flex justify-between mt-4'>
            <p className='text-xs font-bold'>プロフィール充実度</p>
            <p className='text-sm font-medium'>{point}%</p>
          </div>
          <div className='h-3 w-full rounded-full border border-[#aeaeae] relative box-content'>
            <div
              className='absolute left-0 top-1/2 -translate-y-1/2 h-3 bg-[#2cb696] rounded-full text-sm text-white flex items-center justify-center'
              style={{width: `${point}%`}}
            ></div>
          </div>
        </div>
      </div>
      <h3 className='text-xl font-bold mt-10 flex justify-between'>
        アカウント情報
        <button
          onClick={() => setIsEdit(!isEdit)}
          className='text-sm leading-none text-[#333] underline decoration-solid'
        >
          {isEdit ? '戻る' : '編集'}
        </button>
      </h3>
      {isEdit ? <EditProfile isEdit={isEdit} setIsEdit={setIsEdit} /> : <DisplayProfile />}
      <h3 className='text-xl font-bold mt-7'>評価履歴</h3>
      {history.length === 0 && <p className='mt-3'>評価履歴はありません</p>}
      {history.map((item) => (
        <dl className='flex items-end mt-2' key={Math.round(Math.random() * 10000)}>
          <dt className='w-3/4 mt-1 font-bold'>
            {item.name}
            <br />
            <span className='text-xs font-normal'>{item.address}</span>
          </dt>
          <dd className='w-1/4 text-xl text-center mt-1'>★{item.star}</dd>
        </dl>
      ))}
    </Drawer>
  )
}
