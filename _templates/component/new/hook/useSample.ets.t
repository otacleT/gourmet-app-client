---
to: "<%= hasHook ? `${path}/hooks/useSample.ts` : null %>"
---
import {useCallback} from 'react'

export const useSample = () => {
  const handleSample = useCallback(() => {
    console.info('sample')
  }, [])

  return {
    handleSample,
  }
}

