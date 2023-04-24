import {Dispatch, SetStateAction, useCallback, useState} from 'react'

export const useStarRating = () => {
  const [hover, setHover] = useState<number>(-1)

  const handleClick = useCallback(
    (num: number, setSelected: Dispatch<SetStateAction<number>>) => {
      setSelected(num)
      setHover(-1)
    },
    [setHover]
  )

  const handleHover = useCallback((num: number) => {
    setHover(num)
  }, [])

  return {
    handleClick,
    handleHover,
    hover,
    setHover,
  }
}
