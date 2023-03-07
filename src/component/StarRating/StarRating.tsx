import {Dispatch, FC, SetStateAction, useCallback, useState} from 'react'

type Props = {
  selected: number
  setSelected: Dispatch<SetStateAction<number>>
}

/**
 * @package
 */
export const StarRating: FC<Props> = (props) => {
  const {selected, setSelected} = props
  const [hover, setHover] = useState<number>(-1)
  const handleClick = useCallback(
    (num: number) => {
      setSelected(num)
      setHover(-1)
    },
    [setSelected, setHover]
  )
  const handleHover = useCallback((num: number) => {
    setHover(num)
  }, [])
  return (
    <div className='relative w-[5em] h-[1em] text-3xl leading-[1em] mt-3'>
      <div className='absolute top-0 left-0 overflow-hidden whitespace-nowrap text-[#fe553e] w-[5em]'>
        {[...Array(5)]
          .map((_, i) => i + 1)
          .map((num: number) => (
            <button
              key={num}
              className={
                num <= selected || num <= hover
                  ? 'opacity-100 cursor-pointer'
                  : 'opacity-0 hover:opacity-100 cursor-pointer'
              }
              onClick={() => handleClick(num)}
              onFocus={() => handleHover(num)}
              onMouseOver={() => handleHover(num)}
              onMouseLeave={() => setHover(-1)}
            >
              ★
            </button>
          ))}
      </div>
      <div className='text-[#aeaeae]'>☆☆☆☆☆</div>
    </div>
  )
}
