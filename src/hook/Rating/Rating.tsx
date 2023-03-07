import {useContractFunction} from '@usedapp/core'

import {contract} from '..'

export const useRating = () => {
  const {send, state} = useContractFunction(contract, 'Rating', {
    transactionName: 'Add',
  })
  const loading = state.status === 'PendingSignature' || state.status === 'Mining'
  const success = state.status === 'Success'
  const error = state.status === 'Fail' || state.status === 'Exception'
  return {
    error,
    loading,
    send,
    success,
  }
}
