---
to: "<%= hasHook ? `${path}/hook/use${name}.ts` : null %>"
---
import {useCallback} from 'react'

export const use<%=name%> = () => {
  const handleSample = useCallback(() => {
    console.info('sample')
  }, [])

  return {
    handleSample,
  }
}

