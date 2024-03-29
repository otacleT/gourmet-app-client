import Image from 'next/image'
import {FC} from 'react'

import {ResponsiveTxt} from '../common/ResponsiveTxt'
import {Button} from './element/Button'
import {useHome} from './hook/useHome'

/**
 * @package
 */
export const Home: FC = () => {
  const {hasMetamask, isStarting} = useHome()

  return (
    <>
      <ResponsiveTxt />
      {isStarting ? (
        <div className='loading'></div>
      ) : (
        <div className='hidden md:block w-full h-[calc(100vh-70px)] min-h-[720px] max-w-3xl lg:max-w-6xl px-5 pt-52 md:max-w-4xl lg:pt-60 mx-auto relative'>
          {hasMetamask ? (
            <div>
              <p className='md:text-[26px] lg:text-3xl font-bold'>信頼度に応じた飲食店評価アプリ</p>
              <div className='flex items-center mt-10'>
                <Button />
              </div>
            </div>
          ) : (
            <div>
              <p className='md:text-[26px] lg:text-3xl font-bold'>Metamask is required</p>
              <a
                className='inline-block text-lg font-bold text-white text-center py-3 px-6 rounded-md bg-[#2cb696] mt-10'
                href='https://metamask.io/download/'
                target='_blank'
                rel='noopener noreferrer'
              >
                Download Metamask
              </a>
            </div>
          )}
          <div className='absolute right-[33%] top-[40px] z-10'>
            <div className='w-[200px] lg:w-[230px] h-[285px] lg:h-[310px] relative'>
              <div className='Comment w-[135px] lg:w-[145px] h-[75px] lg:h-[80px] opacity-0 scale-50 flex items-center justify-center rounded-[50%] border-2 border-[#333] bg-white absolute left-0 top-[30px] -translate-x-[15%] animate-comment01Show'>
                <p className='text-lg font-bold tracking-wider inline-block'>Good!</p>
              </div>
              <div className='w-[80px] h-[195px] lg:h-[220px] absolute right-0 bottom-0 text-center z-5'>
                <Image
                  className='object-contain z-10 opacity-0 translate-y-[20px] animate-peopleShow'
                  src='/people01.png'
                  alt='people01'
                  fill
                  sizes='(max-width: 640px) 80px,
              100px'
                />
              </div>
              <div className='w-0 h-0 rounded-[50%] bg-[#2cb696] absolute right-[40px] bottom-[5px] z-1 translate-x-1/2 translate-y-1/2 animate-circleShow'></div>
            </div>
          </div>
          <div className='absolute right-[37%] bottom-[15%] z-20'>
            <div className='w-[200px] lg:w-[230px] h-[285px] lg:h-[310px] relative'>
              <div className='Comment w-[135px] lg:w-[145px] h-[75px] lg:h-[80px] opacity-0 scale-50 flex items-center justify-center rounded-[50%] border-2 border-[#333] bg-white absolute -left-[5px] top-[10px] -translate-x-[15%] animate-comment01Show'>
                <p className='text-lg font-bold tracking-wider inline-block'>Yummy!</p>
              </div>
              <div className='w-[90px] h-[220px] lg:h-[250px] absolute right-0 bottom-0 text-center z-5'>
                <Image
                  className='object-contain z-10 opacity-0 translate-y-[20px] animate-peopleShow'
                  src='/people02.png'
                  alt='people02'
                  fill
                  sizes='(max-width: 640px) 90px,
              110px'
                />
              </div>
              <div className='w-0 h-0 rounded-[50%] bg-[#2cb696] absolute right-[45px] bottom-[5px] z-1 translate-x-1/2 translate-y-1/2 animate-circleShow'></div>
            </div>
          </div>
          <div className='absolute right-[30px] bottom-[30%] z-30'>
            <div className='w-[200px] lg:w-[230px] h-[285px] lg:h-[310px] relative'>
              <div className='Comment w-[135px] lg:w-[145px] h-[75px] lg:h-[80px] opacity-0 scale-50 flex items-center justify-center rounded-[50%] border-2 border-[#333] bg-white absolute -left-[5px] top-[10px] -translate-x-[15%] animate-comment01Show'>
                <p className='text-lg font-bold tracking-wider inline-block'>Nice!</p>
              </div>
              <div className='w-[85px] h-[225px] lg:h-[247px] absolute right-0 bottom-0 text-center z-5'>
                <Image
                  className='object-contain z-10 opacity-0 translate-y-[20px] animate-peopleShow'
                  src='/people03.png'
                  alt='people03'
                  fill
                  sizes='(max-width: 640px) 85px,
              105px'
                />
              </div>
              <div className='w-0 h-0 rounded-[50%] bg-[#2cb696] absolute right-[40px] bottom-[5px] z-1 translate-x-1/2 translate-y-1/2 animate-circleShow'></div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
