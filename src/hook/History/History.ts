import {useEffect, useState} from 'react'
import {useAuth} from 'src/context/auth'
import {getHistory} from 'src/lib/firebase/history'
import {Item} from 'src/lib/firebase/rating'

export type UseHistoryOutput = {
  history: Item[]
  isLoading: boolean
}

const DEFAULT_OUTPUT: UseHistoryOutput = {
  history: [],
  isLoading: true,
}

export function useHistory(): UseHistoryOutput {
  const [output, setOutput] = useState(DEFAULT_OUTPUT)
  const {fbUser} = useAuth()

  useEffect(() => {
    void (async () => {
      const history = await getHistory(fbUser)
      setOutput({history, isLoading: false})
    })()
  }, [fbUser])

  return output
}
