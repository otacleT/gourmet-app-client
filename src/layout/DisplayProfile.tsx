import {useAuth} from 'src/context/auth'

export const DisplayProfile = () => {
  const {user} = useAuth()
  return (
    <dl className='flex justify-between items-center flex-wrap mt-2'>
      <dt className='w-1/3 flex items-center justify-between text-sm mt-1 py-2'>
        名前
        {user?.name && (
          <span className='text-xs leading-none inline-block rounded-full px-2 py-1 bg-[#fe553e] text-white'>
            +10%
          </span>
        )}
      </dt>
      <dd className='w-[calc(66%-10px)] text-center mt-1 py-2'>{user?.name ? user.name : 'ー'}</dd>
      <dt className='w-1/3 flex items-center justify-between text-sm mt-1 py-2'>
        性別
        {user?.sex && (
          <span className='text-xs leading-none inline-block rounded-full px-2 py-1 bg-[#fe553e] text-white'>
            +10%
          </span>
        )}
      </dt>
      <dd className='w-[calc(66%-10px)] text-center mt-1 py-2'>{user?.sex ? user.sex : 'ー'}</dd>
      <dt className='w-1/3 flex items-center justify-between text-sm mt-1 py-2'>
        生年月日
        {user?.birth && (
          <span className='text-xs leading-none inline-block rounded-full px-2 py-1 bg-[#fe553e] text-white'>
            +10%
          </span>
        )}
      </dt>
      <dd className='w-[calc(66%-10px)] text-center mt-1 py-2'>
        {user?.birth ? user.birth : 'ー'}
      </dd>
      <dt className='w-1/3 flex items-center justify-between text-sm mt-1 py-2'>
        住所
        {user?.address && (
          <span className='text-xs leading-none inline-block rounded-full px-2 py-1 bg-[#fe553e] text-white'>
            +10%
          </span>
        )}
      </dt>
      <dd className='w-[calc(66%-10px)] text-center mt-1 py-2'>
        {user?.address ? user.address : 'ー'}
      </dd>
      <dt className='w-1/3 flex items-center justify-between text-sm mt-1 py-2'>
        職業
        {user?.job && (
          <span className='text-xs leading-none inline-block rounded-full px-2 py-1 bg-[#fe553e] text-white'>
            +10%
          </span>
        )}
      </dt>
      <dd className='w-[calc(66%-10px)] text-center mt-1 py-2'>{user?.job ? user.job : 'ー'}</dd>
    </dl>
  )
}
